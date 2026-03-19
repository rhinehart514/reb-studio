import { streamText, tool, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: `You are an AI website builder assistant for REB Studio. You're helping a new business owner create their website through conversation.

Your job is to gather information about their business and use the save_section tool to build their website in real-time. Be conversational, warm, and efficient.

**Information to gather (in roughly this order):**
1. Business name and type
2. What services/products they offer (with prices if they know them)
3. Their business hours
4. Location/address
5. Contact info (phone, email)
6. Their story — why they started, what makes them different
7. Any testimonials or reviews they want to feature

**How to work:**
- After learning the business name and type, immediately save the hero and settings sections with what you know
- As you learn services, save them to the services section
- As you learn contact/location info, save it to the contact section
- Don't wait until you have everything — save each section as soon as you have enough info
- Use the save_section tool to save data. Send COMPLETE section data each time.
- After saving, let them know what you've built so far
- Be enthusiastic about their business — this should feel exciting, not like filling out forms

**Tone:** Friendly, professional, efficient. Get them excited about their new website. Don't ask too many questions at once — 1-2 per message.

**Important:** After you've saved 3 or more sections, proactively tell the user their site is taking shape and they can preview it. Say something like: "I've built out your hero, services, and contact sections! You can preview your site at /preview anytime — it updates live as we talk." Continue gathering info after that, but make sure they know the preview exists.`,
    messages,
    tools: {
      save_section: tool({
        description:
          "Save content for a website section. Send the COMPLETE section data.",
        inputSchema: z.object({
          section: z.enum([
            "hero",
            "services",
            "story",
            "testimonials",
            "events",
            "providers",
            "contact",
            "settings",
          ]),
          data: z.record(z.string(), z.unknown()),
        }),
        execute: async ({ section, data }) => {
          const { sectionSchemas } = await import("@/lib/schemas");
          const schema = sectionSchemas[section];
          const parsed = schema.safeParse(data);
          if (!parsed.success) {
            return {
              success: false,
              error: parsed.error.message,
            };
          }

          const { setContent } = await import("@/lib/storage");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await setContent(section, parsed.data as any);

          const { revalidatePath } = await import("next/cache");
          revalidatePath("/preview");

          return {
            success: true,
            section,
            message: `Saved ${section} section`,
          };
        },
      }),
    },
    stopWhen: stepCountIs(8),
  });

  return result.toTextStreamResponse();
}
