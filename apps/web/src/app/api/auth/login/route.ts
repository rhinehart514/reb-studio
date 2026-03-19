import { NextResponse } from "next/server";
import {
  validateCredentials,
  createToken,
  setAuthCookie,
} from "@/lib/auth";

export async function POST(request: Request) {
  let username: string, password: string;
  try {
    ({ username, password } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!validateCredentials(username, password)) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = await createToken();
  await setAuthCookie(token);

  return NextResponse.json({ success: true });
}
