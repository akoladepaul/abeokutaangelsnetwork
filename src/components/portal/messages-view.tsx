"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  lastMessageAt?: string;
  unread: number;
}

interface MessagesViewProps {
  conversations: Conversation[];
  userId: string;
  initialMatchId?: string | null;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatSidebarDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
  if (diffDays === 0) return formatTime(iso);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return d.toLocaleDateString([], { weekday: "short" });
  return d.toLocaleDateString([], { day: "numeric", month: "short" });
}

function getDayLabel(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return d.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" });
}

export function MessagesView({ conversations: initialConversations, userId, initialMatchId }: MessagesViewProps) {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeMatchId, setActiveMatchId] = useState<string | null>(
    initialMatchId ?? initialConversations[0]?.matchId ?? null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const markRead = useCallback(async (matchId: string) => {
    await fetch("/api/portal/messages/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId }),
    });
    setConversations((prev) =>
      prev.map((c) => c.matchId === matchId ? { ...c, unread: 0 } : c)
    );
  }, []);

  useEffect(() => {
    if (!activeMatchId) return;
    loadMessages(activeMatchId);
    markRead(activeMatchId);

    const channel = supabase
      .channel(`messages:${activeMatchId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `match_id=eq.${activeMatchId}`,
      }, (payload) => {
        const msg = payload.new as Message;
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
        // Update last message in sidebar
        setConversations((prev) =>
          prev.map((c) =>
            c.matchId === activeMatchId
              ? { ...c, lastMessage: msg.body, lastMessageAt: msg.created_at }
              : c
          )
        );
        // Mark as read immediately since we're in the active thread
        if (msg.sender_id !== userId) markRead(activeMatchId);
      })
      .subscribe();

    // Subscribe to ALL matches for unread badge updates in inactive threads
    const allMatchIds = initialConversations.map((c) => c.matchId);
    const inactiveIds = allMatchIds.filter((id) => id !== activeMatchId);

    const inactiveChannels = inactiveIds.map((matchId) =>
      supabase
        .channel(`unread:${matchId}`)
        .on("postgres_changes", {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `match_id=eq.${matchId}`,
        }, (payload) => {
          const msg = payload.new as Message;
          if (msg.sender_id === userId) return;
          setConversations((prev) =>
            prev.map((c) =>
              c.matchId === matchId
                ? { ...c, unread: c.unread + 1, lastMessage: msg.body, lastMessageAt: msg.created_at }
                : c
            )
          );
        })
        .subscribe()
    );

    return () => {
      supabase.removeChannel(channel);
      inactiveChannels.forEach((ch) => supabase.removeChannel(ch));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const body = newMessage.trim();
    setNewMessage("");
    await supabase.from("messages").insert({
      match_id: activeMatchId,
      sender_id: userId,
      body,
    });
    setSending(false);
  }

  const activeConvo = conversations.find((c) => c.matchId === activeMatchId);

  // Group messages by day for date separators
  const groupedMessages: Array<{ day: string; messages: Message[] }> = [];
  for (const msg of messages) {
    const day = getDayLabel(msg.created_at);
    if (!groupedMessages.length || groupedMessages[groupedMessages.length - 1].day !== day) {
      groupedMessages.push({ day, messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white border border-cream-dark rounded-sm overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-cream-dark flex flex-col">
        <div className="p-4 border-b border-cream-dark">
          <p className="font-semibold text-charcoal text-sm">Conversations</p>
        </div>
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-muted text-xs leading-relaxed">
            No conversations yet. Once an investor and startup connect, messaging opens here.
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
                  <div className="flex items-center justify-between gap-1">
                    <p className={cn("text-sm truncate", convo.unread > 0 ? "font-semibold text-charcoal" : "font-medium text-charcoal")}>
                      {convo.otherPartyName}
                    </p>
                    {convo.lastMessageAt && (
                      <span className="text-xs text-muted flex-shrink-0">{formatSidebarDate(convo.lastMessageAt)}</span>
                    )}
                  </div>
                  {convo.lastMessage && (
                    <p className={cn("text-xs truncate mt-0.5", convo.unread > 0 ? "text-charcoal/70 font-medium" : "text-muted")}>
                      {convo.lastMessage}
                    </p>
                  )}
                </div>
                {convo.unread > 0 && (
                  <span className="w-5 h-5 bg-gold text-forest-dark text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {convo.unread > 9 ? "9+" : convo.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeMatchId && activeConvo ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-cream-dark flex items-center gap-3 flex-shrink-0">
              <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-forest font-bold text-sm">{activeConvo.otherPartyInitial}</span>
              </div>
              <p className="font-semibold text-charcoal text-sm">{activeConvo.otherPartyName}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.length === 0 && (
                <p className="text-center text-muted text-xs py-8">No messages yet. Start the conversation.</p>
              )}
              {groupedMessages.map(({ day, messages: dayMsgs }) => (
                <div key={day} className="flex flex-col gap-3">
                  {/* Day separator */}
                  <div className="flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-cream-dark" />
                    <span className="text-xs text-muted px-2">{day}</span>
                    <div className="flex-1 h-px bg-cream-dark" />
                  </div>

                  {dayMsgs.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col max-w-xs lg:max-w-md",
                        msg.sender_id === userId ? "self-end items-end" : "self-start items-start"
                      )}
                    >
                      <div className={cn(
                        "px-4 py-2.5 rounded-sm text-sm leading-relaxed",
                        msg.sender_id === userId
                          ? "bg-forest text-cream"
                          : "bg-cream border border-cream-dark text-charcoal"
                      )}>
                        {msg.body}
                      </div>
                      <p className="text-xs text-muted mt-1 px-1">{formatTime(msg.created_at)}</p>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-cream-dark flex gap-2 flex-shrink-0">
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
