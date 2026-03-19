import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { ContentSection } from "@/lib/types";
import { sectionSchemas } from "@/lib/schemas";
import { getContent, setContent } from "@/lib/storage";

const VALID_SECTIONS: ContentSection[] = [
  "hero",
  "services",
  "story",
  "testimonials",
  "events",
  "providers",
  "contact",
  "settings",
];

function isValidSection(section: string): section is ContentSection {
  return VALID_SECTIONS.includes(section as ContentSection);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;

  if (!isValidSection(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const data = await getContent(section);
  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;

  if (!isValidSection(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const schema = sectionSchemas[section];
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join(", ") },
      { status: 422 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await setContent(section, parsed.data as any);
  revalidatePath("/");
  revalidatePath("/preview");

  return NextResponse.json({ success: true });
}
