"use client";

import { useRef, useEffect, useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Bot, User, Loader2, ExternalLink, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text)
    .join("");
}

const transport = new DefaultChatTransport({ api: "/api/onboard" });

export function OnboardingChat() {
  const { messages, sendMessage, status } = useChat({
    transport,
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendPrompt = (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendPrompt(input);
  };

  const isEmpty = messages.length === 0;

  // Count saved sections from tool results
  const savedSections = messages
    .flatMap((m) => m.parts ?? [])
    .filter(
      (p) =>
        p.type === "tool-invocation" &&
        p.state === "output-available" &&
        typeof p.output === "object" &&
        p.output !== null &&
        (p.output as Record<string, unknown>).success === true
    );

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#0a0a0a]">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#262626]">
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">
            Tell me about your business
          </h2>
          <p className="text-xs text-zinc-500">
            I&apos;ll build your website as we talk.
          </p>
        </div>
        {savedSections.length > 0 && (
          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-900/30 border border-emerald-800/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400">
              {savedSections.length} section{savedSections.length !== 1 ? "s" : ""} saved
            </span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-12 h-12 rounded-lg bg-violet-600/10 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Let&apos;s get started!
            </h3>
            <p className="text-sm text-zinc-400 max-w-sm mb-6">
              Tell me about your business and I&apos;ll start building your
              website. I&apos;ll ask a few questions about your services, hours,
              and location.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
              {[
                "I run a hair salon in Brooklyn",
                "I'm a personal trainer",
                "I own a coffee shop",
                "I'm a freelance photographer",
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendPrompt(prompt)}
                  className="px-4 py-3 rounded-md bg-[#141414] border border-[#262626] text-sm text-zinc-300 hover:bg-[#1c1c1c] hover:text-white hover:border-[#333] transition-colors duration-150 text-left"
                >
                  &ldquo;{prompt}&rdquo;
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
                      : "section";

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
                            ? `Saved ${sectionName}`
                            : `Failed to save ${sectionName}`
                          : `Saving ${sectionName}...`}
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
                <span className="text-xs text-zinc-500">Building...</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Preview bar — show after sections are saved */}
      {savedSections.length >= 2 && (
        <div className="px-4 py-3 border-t border-[#262626] bg-[#0f0f0f]">
          <a
            href="/preview"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors duration-150"
          >
            Preview your site
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-[#262626]">
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-lg px-4 py-2 focus-within:border-violet-600/50 transition-colors duration-150"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me about your business..."
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
