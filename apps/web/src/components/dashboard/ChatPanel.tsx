"use client";

import { useRef, useEffect, useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Send,
  Clock,
  CalendarPlus,
  FileText,
  BarChart3,
  Bot,
  User,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const QUICK_PROMPTS = [
  { label: "Update my hours", icon: Clock },
  { label: "Add an event", icon: CalendarPlus },
  { label: "Write a blog post", icon: FileText },
  { label: "How's my site?", icon: BarChart3 },
];

function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text)
    .join("");
}

interface ChatPanelProps {
  initialPrompt?: string;
}

export function ChatPanel({ initialPrompt }: ChatPanelProps) {
  const agentTransport = useRef(
    new DefaultChatTransport({ api: "/api/agent", credentials: "same-origin" })
  );
  const { messages, sendMessage, status } = useChat({
    transport: agentTransport.current,
    onFinish: () => {
      persistMessages();
    },
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialSentRef = useRef(false);

  const isLoading = status === "submitted" || status === "streaming";

  const persistMessages = () => {
    if (messages.length === 0) return;
    const simple = messages.map((m) => ({
      id: m.id,
      role: m.role,
      content: getMessageText(m.parts as Array<{ type: string; text?: string }>),
      timestamp: Date.now(),
    }));
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(simple),
    }).catch(() => {});
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  useEffect(() => {
    if (initialPrompt && !initialSentRef.current && messages.length === 0 && !isLoading) {
      initialSentRef.current = true;
      const timer = setTimeout(() => {
        send(initialPrompt);
      }, 500);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt, messages.length, isLoading]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#262626]">
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">
            Chat with your AI assistant
          </h2>
          <p className="text-xs text-zinc-500">
            Ask me to update your site, add events, change hours, anything.
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-12 h-12 rounded-lg bg-violet-600/10 flex items-center justify-center mb-4 animate-pulse-gentle">
              <Bot className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Hey! What can I help with?
            </h3>
            <p className="text-sm text-zinc-400 max-w-sm mb-8">
              I can update your website content, add events, change hours, write
              copy, and more. Just tell me what you need.
            </p>
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => send(prompt.label)}
                  className="flex items-center gap-2 px-4 py-3 rounded-md bg-[#141414] border border-[#262626] text-sm text-zinc-300 hover:bg-[#1c1c1c] hover:text-white hover:border-[#333] transition-colors duration-150 text-left"
                >
                  <prompt.icon className="w-4 h-4 text-violet-400 shrink-0" />
                  <span className="font-mono text-xs">{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => {
          const text = getMessageText(message.parts as Array<{ type: string; text?: string }>);

          return (
            <div key={message.id}>
              {/* Tool invocation chips */}
              {message.parts?.map((part, i) => {
                if (part.type === "tool-invocation") {
                  const p = part as { type: string; state: string; output?: unknown; args?: unknown };
                  const isComplete = p.state === "output-available" || p.state === "output-error" || p.state === "output-denied";
                  const success =
                    isComplete &&
                    p.state === "output-available" &&
                    typeof p.output === "object" &&
                    p.output !== null &&
                    (p.output as Record<string, unknown>).success === true;
                  const sectionName =
                    typeof p.args === "object" && p.args !== null
                      ? (p.args as Record<string, unknown>).section
                      : "content";

                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 py-1.5 px-3 my-1 rounded-md bg-[#141414] border border-[#262626] w-fit"
                    >
                      {isComplete ? (
                        success ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <span className="w-3.5 h-3.5 text-amber-400 text-xs">!</span>
                        )
                      ) : (
                        <Loader2 className="w-3.5 h-3.5 text-violet-400 animate-spin" />
                      )}
                      <span className="text-xs font-mono text-zinc-400">
                        {isComplete
                          ? success
                            ? `Updated ${sectionName}`
                            : `Failed to update ${sectionName}`
                          : `Updating ${sectionName}...`}
                      </span>
                    </div>
                  );
                }
                return null;
              })}

              {text && (
                <div
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[85%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        message.role === "user" ? "bg-zinc-700" : "bg-violet-600"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-3.5 h-3.5 text-zinc-300" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <div className={message.role === "user" ? "text-right" : "text-left"}>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          message.role === "user"
                            ? "bg-violet-600 text-white"
                            : "bg-[#141414] text-zinc-200 border border-[#262626]"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <div className="chat-markdown">
                            <ReactMarkdown>{text}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{text}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {isLoading && messages.length > 0 && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-[#141414] border border-[#262626]">
              <span className="flex items-center gap-2 py-0.5">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-typing-dot" />
                <span className="text-xs text-zinc-500">Thinking</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {!isEmpty && !isLoading && (
        <div className="flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-hide">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt.label}
              onClick={() => send(prompt.label)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#141414] border border-[#262626] text-xs font-mono text-zinc-400 hover:bg-[#1c1c1c] hover:text-zinc-200 transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <prompt.icon className="w-3 h-3" />
              {prompt.label}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 border-t border-[#262626]">
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-lg px-4 py-2 focus-within:border-violet-600/50 transition-colors duration-150"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me what to update..."
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 outline-none min-h-[44px]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`w-9 h-9 rounded-md flex items-center justify-center transition-all duration-150 shrink-0 ${
              isLoading
                ? "bg-violet-600 shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                : "bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600"
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
