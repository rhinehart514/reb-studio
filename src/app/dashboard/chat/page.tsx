"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ChatPanel } from "@/components/dashboard/ChatPanel";

function ChatWithIntent() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent") ?? undefined;

  return (
    <div className="h-[calc(100vh-3.5rem)] md:h-screen">
      <ChatPanel initialPrompt={intent} />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[calc(100vh-3.5rem)] md:h-screen">
          <ChatPanel />
        </div>
      }
    >
      <ChatWithIntent />
    </Suspense>
  );
}
