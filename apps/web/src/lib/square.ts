import { SquareClient, SquareEnvironment, WebhooksHelper } from "square";
import type {
  ServicesContent,
  ContactContent,
  SiteSettings,
  ServiceItem,
} from "./types";
import { getContent, setContent } from "./storage";

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

export function getSquareClient(accessToken: string): SquareClient {
  const env =
    process.env.SQUARE_ENVIRONMENT === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox;

  return new SquareClient({
    token: accessToken,
    environment: env,
  });
}

// ---------------------------------------------------------------------------
// OAuth helpers
// ---------------------------------------------------------------------------

const SCOPES = [
  "MERCHANT_PROFILE_READ",
  "ITEMS_READ",
  "ORDERS_READ",
  "APPOINTMENTS_READ",
];

export function getOAuthUrl(state: string): string {
  const appId = process.env.SQUARE_APP_ID;
  if (!appId) throw new Error("SQUARE_APP_ID is not set");

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_URL is not set");

  const redirectUri = `${baseUrl}/api/square/callback`;

  const isSandbox = process.env.SQUARE_ENVIRONMENT !== "production";
  const host = isSandbox
    ? "https://connect.squareupsandbox.com"
    : "https://connect.squareup.com";

  const params = new URLSearchParams({
    client_id: appId,
    scope: SCOPES.join(" "),
    session: "false",
    state,
    redirect_uri: redirectUri,
  });

  return `${host}/oauth2/authorize?${params.toString()}`;
}

export interface SquareTokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

function getSquareOAuthHost(): string {
  const isSandbox = process.env.SQUARE_ENVIRONMENT !== "production";
  return isSandbox
    ? "https://connect.squareupsandbox.com"
    : "https://connect.squareup.com";
}

function getSquareAppCredentials(): { appId: string; appSecret: string } {
  const appId = process.env.SQUARE_APP_ID;
  const appSecret = process.env.SQUARE_APP_SECRET;
  if (!appId || !appSecret) {
    throw new Error("SQUARE_APP_ID and SQUARE_APP_SECRET must be set");
  }
  return { appId, appSecret };
}

export async function exchangeCodeForToken(code: string): Promise<SquareTokenData> {
  const { appId, appSecret } = getSquareAppCredentials();
  const host = getSquareOAuthHost();

  const response = await fetch(`${host}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: appId,
      client_secret: appSecret,
      code,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Square OAuth token exchange failed:", text);
    throw new Error("Failed to exchange Square authorization code");
  }

  const data = await response.json();
  return {
    accessToken: data.access_token as string,
    refreshToken: data.refresh_token as string,
    expiresAt: data.expires_at as string,
  };
}

export async function refreshAccessToken(refreshToken: string): Promise<SquareTokenData> {
  const { appId, appSecret } = getSquareAppCredentials();
  const host = getSquareOAuthHost();

  const response = await fetch(`${host}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: appId,
      client_secret: appSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Square OAuth token refresh failed:", text);
    throw new Error("Failed to refresh Square access token");
  }

  const data = await response.json();
  return {
    accessToken: data.access_token as string,
    refreshToken: data.refresh_token as string,
    expiresAt: data.expires_at as string,
  };
}

export function isTokenExpired(expiresAt: string): boolean {
  // Refresh 5 minutes before actual expiry to avoid race conditions
  const expiryTime = new Date(expiresAt).getTime();
  const bufferMs = 5 * 60 * 1000;
  return Date.now() >= expiryTime - bufferMs;
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

export interface SquareData {
  catalogItems: Array<{
    id: string;
    name: string;
    description: string;
    variations: Array<{
      name: string;
      priceMoney?: { amount: bigint; currency: string };
    }>;
  }>;
  locations: Array<{
    id: string;
    name: string;
    address?: {
      addressLine1?: string;
      locality?: string;
      administrativeDistrictLevel1?: string;
      postalCode?: string;
    };
    phoneNumber?: string;
    businessHours?: {
      periods?: Array<{
        dayOfWeek?: string;
        startLocalTime?: string;
        endLocalTime?: string;
      }>;
    };
  }>;
  merchantName: string;
}

export async function fetchSquareData(
  accessToken: string
): Promise<SquareData> {
  const client = getSquareClient(accessToken);

  // Fetch catalog items
  const catalogItems: SquareData["catalogItems"] = [];
  try {
    const catalogResult = await client.catalog.list({ types: "ITEM" });
    if (catalogResult.data) {
      for (const obj of catalogResult.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const item = obj as any;
        if (item.type === "ITEM" && item.itemData) {
          catalogItems.push({
            id: item.id ?? "",
            name: item.itemData.name ?? "",
            description: item.itemData.description ?? "",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            variations: (item.itemData.variations ?? []).map((v: any) => ({
              name: v.itemData?.name ?? "",
              priceMoney: v.itemData?.priceMoney
                ? {
                    amount: v.itemData.priceMoney.amount ?? BigInt(0),
                    currency: v.itemData.priceMoney.currency ?? "USD",
                  }
                : undefined,
            })),
          });
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch Square catalog:", err);
  }

  // Fetch locations
  const locations: SquareData["locations"] = [];
  let merchantName = "";
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const locResult: any = await client.locations.list();
    const locData = locResult.data ?? locResult.locations ?? [];
    for (const loc of locData) {
      locations.push({
        id: loc.id ?? "",
        name: loc.name ?? "",
        address: loc.address
          ? {
              addressLine1: loc.address.addressLine1 ?? undefined,
              locality: loc.address.locality ?? undefined,
              administrativeDistrictLevel1:
                loc.address.administrativeDistrictLevel1 ?? undefined,
              postalCode: loc.address.postalCode ?? undefined,
            }
          : undefined,
        phoneNumber: loc.phoneNumber ?? undefined,
        businessHours: loc.businessHours
          ? {
              periods: (loc.businessHours.periods ?? []).map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (p: any) => ({
                  dayOfWeek: p.dayOfWeek ?? undefined,
                  startLocalTime: p.startLocalTime ?? undefined,
                  endLocalTime: p.endLocalTime ?? undefined,
                })
              ),
            }
          : undefined,
      });
      if (!merchantName && loc.name) {
        merchantName = loc.name;
      }
    }
  } catch (err) {
    console.error("Failed to fetch Square locations:", err);
  }

  // Try to get merchant name
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const merchantResult: any = await client.merchants.list();
    const merchants = merchantResult.data ?? merchantResult.merchant ?? [];
    if (Array.isArray(merchants) && merchants.length > 0) {
      merchantName = merchants[0].businessName ?? merchantName;
    }
  } catch (err) {
    console.error("Failed to fetch Square merchant:", err);
  }

  return { catalogItems, locations, merchantName };
}

// ---------------------------------------------------------------------------
// Mapping Square data → REB content sections
// ---------------------------------------------------------------------------

function formatPrice(amount: bigint, currency: string): string {
  const dollars = Number(amount) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(dollars);
}

function formatBusinessHours(
  periods?: SquareData["locations"][0]["businessHours"]
): string {
  if (!periods?.periods?.length) return "";

  const dayOrder = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN",
  ];
  const dayLabels: Record<string, string> = {
    MON: "Mon",
    TUE: "Tue",
    WED: "Wed",
    THU: "Thu",
    FRI: "Fri",
    SAT: "Sat",
    SUN: "Sun",
  };

  const sorted = [...periods.periods].sort((a, b) => {
    const ai = dayOrder.indexOf(a.dayOfWeek ?? "");
    const bi = dayOrder.indexOf(b.dayOfWeek ?? "");
    return ai - bi;
  });

  return sorted
    .map((p) => {
      const day = dayLabels[p.dayOfWeek ?? ""] ?? p.dayOfWeek;
      const start = p.startLocalTime?.slice(0, 5) ?? "";
      const end = p.endLocalTime?.slice(0, 5) ?? "";
      return `${day} ${start}–${end}`;
    })
    .join(", ");
}

export interface MappedContent {
  services: Partial<ServicesContent>;
  contact: Partial<ContactContent>;
  settings: Partial<SiteSettings>;
}

export function mapSquareToContent(squareData: SquareData): MappedContent {
  // Map catalog items → services
  const services: ServiceItem[] = squareData.catalogItems.map((item) => {
    const firstVariation = item.variations[0];
    const price = firstVariation?.priceMoney
      ? formatPrice(firstVariation.priceMoney.amount, firstVariation.priceMoney.currency)
      : "";

    return {
      id: item.id,
      name: item.name,
      description: item.description,
      duration: "",
      price,
      featured: false,
      who_its_for: "",
      booking_link: "",
      comingSoon: false,
    };
  });

  // Map first location → contact
  const loc = squareData.locations[0];
  const address = loc?.address
    ? [
        loc.address.addressLine1,
        loc.address.locality,
        loc.address.administrativeDistrictLevel1,
        loc.address.postalCode,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  const hours = formatBusinessHours(loc?.businessHours);

  return {
    services: {
      services,
    },
    contact: {
      ...(address ? { address } : {}),
      ...(loc?.phoneNumber ? { phone: loc.phoneNumber } : {}),
      ...(hours ? { hours } : {}),
    },
    settings: {
      ...(squareData.merchantName ? { siteName: squareData.merchantName } : {}),
    },
  };
}

// ---------------------------------------------------------------------------
// Shared sync logic — merges Square data without overwriting user edits
// ---------------------------------------------------------------------------

function mergeServices(
  existing: ServiceItem[],
  incoming: ServiceItem[]
): ServiceItem[] {
  const merged = [...existing];

  for (const sqItem of incoming) {
    const matchIdx = merged.findIndex(
      (e) => e.id === sqItem.id || e.name.toLowerCase() === sqItem.name.toLowerCase()
    );

    if (matchIdx >= 0) {
      // Update Square-sourced fields but preserve user edits on enriched fields
      const current = merged[matchIdx];
      merged[matchIdx] = {
        ...current,
        // Always update from Square
        name: sqItem.name,
        price: sqItem.price || current.price,
        description: sqItem.description || current.description,
        // Preserve user-edited fields if they have content
        duration: current.duration || sqItem.duration,
        featured: current.featured,
        who_its_for: current.who_its_for || sqItem.who_its_for,
        booking_link: current.booking_link || sqItem.booking_link,
        comingSoon: current.comingSoon,
        // Use Square ID if we matched by name
        id: sqItem.id || current.id,
      };
    } else {
      // New item from Square — add it
      merged.push(sqItem);
    }
  }

  return merged;
}

export interface SyncResult {
  results: string[];
  itemCount: number;
  locationCount: number;
}

export async function performSquareSync(accessToken: string): Promise<SyncResult> {
  const squareData = await fetchSquareData(accessToken);
  const mapped = mapSquareToContent(squareData);
  const results: string[] = [];

  // Merge services (preserve user edits)
  if (mapped.services.services?.length) {
    const existing = await getContent("services");
    const mergedServices = mergeServices(
      existing.services ?? [],
      mapped.services.services
    );
    await setContent("services", {
      ...existing,
      services: mergedServices,
    } as ServicesContent);
    results.push(`${mapped.services.services.length} services synced`);
  }

  // Merge contact (only overwrite Square-sourced fields)
  if (mapped.contact.address || mapped.contact.phone || mapped.contact.hours) {
    const existing = await getContent("contact");
    await setContent("contact", {
      ...existing,
      ...mapped.contact,
    } as ContactContent);
    results.push("Contact info updated");
  }

  // Merge settings (only overwrite siteName from Square)
  if (mapped.settings.siteName) {
    const existing = await getContent("settings");
    await setContent("settings", {
      ...existing,
      ...mapped.settings,
    } as SiteSettings);
    results.push(`Business name set to "${mapped.settings.siteName}"`);
  }

  return {
    results,
    itemCount: squareData.catalogItems.length,
    locationCount: squareData.locations.length,
  };
}

// ---------------------------------------------------------------------------
// Webhook verification
// ---------------------------------------------------------------------------

export async function verifyWebhookSignature(
  body: string,
  signature: string,
  url: string
): Promise<boolean> {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!signatureKey) {
    console.error("SQUARE_WEBHOOK_SIGNATURE_KEY is not set");
    return false;
  }

  try {
    return WebhooksHelper.verifySignature({
      requestBody: body,
      signatureHeader: signature,
      signatureKey,
      notificationUrl: url,
    });
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return false;
  }
}
