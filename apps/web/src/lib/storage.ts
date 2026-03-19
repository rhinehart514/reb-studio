import { promises as fs } from "fs";
import path from "path";
import { createClient } from "redis";
import type { ContentSection, ContentMap } from "./types";
import { defaults } from "./defaults";

const hasRedis = !!process.env.REDIS_URL;
const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
const DEV_CONTENT_PATH = path.join(process.cwd(), "dev-content.json");

// Singleton Redis client — reused across requests (connection pooling)
let redisClient: ReturnType<typeof createClient> | null = null;
let redisConnecting: Promise<void> | null = null;

async function getRedisClient(): Promise<ReturnType<typeof createClient>> {
  if (redisClient?.isReady) return redisClient;

  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on("error", (err) => {
      console.error("Redis client error:", err);
    });
  }

  if (!redisConnecting) {
    redisConnecting = redisClient.connect().then(() => {
      redisConnecting = null;
    });
  }
  await redisConnecting;
  return redisClient;
}

async function withRedis<T>(fn: (redis: ReturnType<typeof createClient>) => Promise<T>): Promise<T> {
  const client = await getRedisClient();
  return fn(client);
}

async function readDevContent(): Promise<Record<string, unknown>> {
  try {
    const raw = await fs.readFile(DEV_CONTENT_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeDevContent(data: Record<string, unknown>): Promise<void> {
  await fs.writeFile(DEV_CONTENT_PATH, JSON.stringify(data, null, 2));
}

export async function getContent<K extends ContentSection>(
  section: K
): Promise<ContentMap[K]> {
  if (hasRedis) {
    return withRedis(async (redis) => {
      const raw = await redis.get(`reb:content:${section}`);
      if (raw) return JSON.parse(raw) as ContentMap[K];
      return defaults[section];
    });
  }

  const store = await readDevContent();
  return (store[section] as ContentMap[K]) ?? defaults[section];
}

export async function setContent<K extends ContentSection>(
  section: K,
  data: ContentMap[K]
): Promise<void> {
  if (hasRedis) {
    return withRedis(async (redis) => {
      await redis.set(`reb:content:${section}`, JSON.stringify(data));
    });
  }

  const store = await readDevContent();
  store[section] = data;
  await writeDevContent(store);
}

export async function uploadFile(
  file: File
): Promise<{ url: string }> {
  if (hasBlob) {
    const { put } = await import("@vercel/blob");
    const blob = await put(file.name, file, { access: "public" });
    return { url: blob.url };
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadsDir, filename);
  await fs.writeFile(filePath, buffer);

  return { url: `/uploads/${filename}` };
}

// Chat persistence

const DEV_CHAT_PATH = path.join(process.cwd(), "dev-chat.json");

async function readDevChat(): Promise<Record<string, unknown[]>> {
  try {
    const raw = await fs.readFile(DEV_CHAT_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeDevChat(data: Record<string, unknown[]>): Promise<void> {
  await fs.writeFile(DEV_CHAT_PATH, JSON.stringify(data, null, 2));
}

export async function saveChatMessages(clientId: string, messages: unknown[]): Promise<void> {
  const trimmed = messages.slice(-100);

  if (hasRedis) {
    return withRedis(async (redis) => {
      await redis.set(`reb:chat:${clientId}`, JSON.stringify(trimmed));
    });
  }

  const store = await readDevChat();
  store[clientId] = trimmed;
  await writeDevChat(store);
}

export async function loadChatMessages(clientId: string): Promise<unknown[]> {
  if (hasRedis) {
    return withRedis(async (redis) => {
      const raw = await redis.get(`reb:chat:${clientId}`);
      if (raw) return JSON.parse(raw) as unknown[];
      return [];
    });
  }

  const store = await readDevChat();
  return (store[clientId] as unknown[]) ?? [];
}

// Activity logging

export async function logActivity(entry: { text: string; time: string; type: string }): Promise<void> {
  if (hasRedis) {
    return withRedis(async (redis) => {
      await redis.lPush("reb:activity", JSON.stringify(entry));
      await redis.lTrim("reb:activity", 0, 49);
    });
  }
  const store = await readDevContent();
  const activity = (store.__activity as unknown[] ?? []);
  activity.unshift(entry);
  store.__activity = activity.slice(0, 50);
  await writeDevContent(store);
}

export async function getActivity(): Promise<Array<{ text: string; time: string; type: string }>> {
  if (hasRedis) {
    return withRedis(async (redis) => {
      const raw = await redis.lRange("reb:activity", 0, 19);
      return raw.map(r => JSON.parse(r));
    });
  }
  const store = await readDevContent();
  return (store.__activity as Array<{ text: string; time: string; type: string }>) ?? [];
}

// Square token persistence

export interface SquareTokenStore {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export async function getSquareTokenData(): Promise<SquareTokenStore | null> {
  if (hasRedis) {
    return withRedis(async (redis) => {
      const raw = await redis.get("reb:square:token_data");
      if (raw) return JSON.parse(raw) as SquareTokenStore;
      // Backward compat: check for legacy string token
      const legacy = await redis.get("reb:square:token");
      if (legacy) return { accessToken: legacy, refreshToken: "", expiresAt: "" };
      return null;
    });
  }
  const store = await readDevContent();
  if (store.__square_token_data) return store.__square_token_data as SquareTokenStore;
  // Backward compat: check for legacy string token
  if (store.__square_token) {
    return { accessToken: store.__square_token as string, refreshToken: "", expiresAt: "" };
  }
  return null;
}

export async function setSquareTokenData(data: SquareTokenStore): Promise<void> {
  if (hasRedis) {
    return withRedis(async (redis) => {
      await redis.set("reb:square:token_data", JSON.stringify(data));
      // Keep legacy key in sync for backward compat
      await redis.set("reb:square:token", data.accessToken);
    });
  }
  const store = await readDevContent();
  store.__square_token_data = data;
  store.__square_token = data.accessToken;
  await writeDevContent(store);
}

// Lead capture

export async function saveLead(email: string, path: string): Promise<void> {
  const entry = { email, path, time: new Date().toISOString() };

  if (hasRedis) {
    return withRedis(async (redis) => {
      await redis.lPush("reb:leads", JSON.stringify(entry));
    });
  }

  const store = await readDevContent();
  const leads = (store.__leads as unknown[]) ?? [];
  leads.push(entry);
  store.__leads = leads;
  await writeDevContent(store);
}

/** @deprecated Use getSquareTokenData instead */
export async function getSquareToken(): Promise<string | null> {
  const data = await getSquareTokenData();
  return data?.accessToken ?? null;
}

/** @deprecated Use setSquareTokenData instead */
export async function setSquareToken(token: string): Promise<void> {
  await setSquareTokenData({ accessToken: token, refreshToken: "", expiresAt: "" });
}

// Click tracking

export async function trackClick(event: string, label: string): Promise<void> {
  const day = new Date().toISOString().split("T")[0];
  const entry = JSON.stringify({ event, label, time: new Date().toISOString() });

  if (hasRedis) {
    return withRedis(async (redis) => {
      await redis.lPush(`reb:clicks:${day}`, entry);
      await redis.expire(`reb:clicks:${day}`, 90 * 86400); // 90 days TTL
    });
  }

  const store = await readDevContent();
  const clicks = (store.__clicks as Record<string, unknown[]>) ?? {};
  if (!clicks[day]) clicks[day] = [];
  clicks[day].push({ event, label, time: new Date().toISOString() });
  store.__clicks = clicks;
  await writeDevContent(store);
}

export async function getClickStats(days: number): Promise<{
  total: number;
  byDay: Array<{ date: string; count: number }>;
  byEvent: Record<string, number>;
}> {
  const result: { total: number; byDay: Array<{ date: string; count: number }>; byEvent: Record<string, number> } = {
    total: 0,
    byDay: [],
    byEvent: {},
  };

  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const day = d.toISOString().split("T")[0];

    let entries: string[] = [];
    if (hasRedis) {
      entries = await withRedis(async (redis) => redis.lRange(`reb:clicks:${day}`, 0, -1));
    } else {
      const store = await readDevContent();
      const clicks = (store.__clicks as Record<string, unknown[]>) ?? {};
      entries = (clicks[day] ?? []).map((e) => JSON.stringify(e));
    }

    const count = entries.length;
    if (count > 0) {
      result.byDay.push({ date: day, count });
      result.total += count;
      for (const raw of entries) {
        try {
          const parsed = JSON.parse(raw) as { event: string };
          result.byEvent[parsed.event] = (result.byEvent[parsed.event] ?? 0) + 1;
        } catch {}
      }
    }
  }

  return result;
}
