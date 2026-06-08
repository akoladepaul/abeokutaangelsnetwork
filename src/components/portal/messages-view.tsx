"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Message } from "@/types/database";

interface Conversation {
  matchId: string;
  otherPartyName: string;
  otherPartyInitial: string;
  lastMessage?: string;
  unread: number;
}

interface MessagesViewProps {
  conversations: Conversation[];
  userId: string;
  initialMatchId?: string | null;
}

export function MessagesView({ conversations, userId, initialMatchId }: MessagesViewProps) {
  const [activeMatchId, setActiveMatchId] = useState<string | null>(
    initialMatchId ?? conversations[0]?.matchId ?? null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!activeMatchId) return;
    loadMessages(activeMatchId);

    const channel = supabase
      .channel(`messages:${activeMatchId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `match_id=eq.${activeMatchId}`,
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message]);
        scrollToBottom();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [activeMatchId]);

  async function loadMessages(matchId: string) {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("match_id", matchId)
      .order("created_at", { ascending: true });
    setMessages(data ?? []);
    setTimeout(scrollToBottom, 100);
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || !activeMatchId) return;
    setSending(true);
    await supabase.from("messages").insert({
      match_id: activeMatchId,
      sender_id: userId,
      body: newMessage.trim(),
    });
    setNewMessage("");
    setSending(false);
  }

  const activeConvo = conversations.find((c) => c.matchId === activeMatchId);

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white border border-cream-dark rounded-sm overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-cream-dark flex flex-col">
        <div className="p-4 border-b border-cream-dark">
          <p className="font-semibold text-charcoal text-sm">Conversations</p>
        </div>
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-muted text-xs">
            No conversations yet. Express interest in a startup to start chatting.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {conversations.map((convo) => (
              <button
                key={convo.matchId}
                onClick={() => setActiveMatchId(convo.matchId)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 text-left border-b border-cream-dark/50 hover:bg-cream transition-colors",
                  activeMatchId === convo.matchId && "bg-cream"
                )}
              >
                <div className="w-9 h-9 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-forest font-bold text-sm">{convo.otherPartyInitial}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-charcoal text-sm truncate">{convo.otherPartyName}</p>
                  {convo.lastMessage && (
                    <p className="text-muted text-xs truncate">{convo.lastMessage}</p>
                  )}
                </div>
                {convo.unread > 0 && (
                  <span className="w-5 h-5 bg-gold text-forest-dark text-xs rounded-full flex items-center justify-center font-bold">
                    {convo.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {activeMatchId && activeConvo ? (
          <>
            <div className="p-4 border-b border-cream-dark flex items-center gap-3">
              <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">
                <span className="text-forest font-bold text-sm">{activeConvo.otherPartyInitial}</span>
              </div>
              <p className="font-semibold text-charcoal text-sm">{activeConvo.otherPartyName}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.length === 0 && (
                <p className="text-center text-muted text-xs py-8">
                  No messages yet. Start the conversation.
                </p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-xs lg:max-w-md",
                    msg.sender_id === userId ? "self-end" : "self-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2.5 rounded-sm text-sm leading-relaxed",
                      msg.sender_id === userId
                        ? "bg-forest text-cream"
                        : "bg-cream border border-cream-dark text-charcoal"
                    )}
                  >
                    {msg.body}
                  </div>
                  <p className="text-xs text-muted mt-1 px-1">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t border-cream-dark flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write a message…"
                className="flex-1 px-3 py-2 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60"
              />
              <Button type="submit" variant="primary" size="sm" disabled={sending || !newMessage.trim()} className="gap-1.5">
                {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                Send
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted text-sm">
            Select a conversation to start messaging.
          </div>
        )}
      </div>
    </div>
  );
}
