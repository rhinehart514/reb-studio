import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getActivity } from "@/lib/storage";

export async function GET() {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const activity = await getActivity();
  return NextResponse.json(activity);
}
