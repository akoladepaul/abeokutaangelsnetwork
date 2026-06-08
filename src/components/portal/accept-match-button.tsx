"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

interface Props {
  matchId: string;
  onAccepted: () => void;
}

export function AcceptMatchButton({ matchId, onAccepted }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function accept() {
    setLoading(true);
    setError(false);
    const res = await fetch("/api/portal/match/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId }),
    });
    setLoading(false);
    if (res.ok) {
      onAccepted();
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="primary" size="sm" className="gap-1.5" onClick={accept} disabled={loading}>
        {loading ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
        {loading ? "Connecting…" : "Accept & Connect"}
      </Button>
      {error && <span className="text-xs text-red-600">Failed. Try again.</span>}
    </div>
  );
}
