import { NextResponse } from "next/server";
import { getSquareTokenData } from "@/lib/storage";

export async function GET() {
  const tokenData = await getSquareTokenData();
  return NextResponse.json({ connected: !!tokenData });
}
