"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
  type: "investor" | "startup";
  currentlyApproved: boolean;
}

export function ApprovalButtons({ userId, type, currentlyApproved }: Props) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  async function act(approved: boolean) {
    setLoading(approved ? "approve" : "reject");
    setError(false);
    const res = await fetch("/api/admin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, approved, type }),
    });
    setLoading(null);
    if (res.ok) {
      router.refresh();
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {error && <span className="text-xs text-red-600">Failed</span>}
      {!currentlyApproved ? (
        <>
          <Button
            variant="primary" size="sm" className="gap-1.5"
            onClick={() => act(true)}
            disabled={loading !== null}
          >
            {loading === "approve" ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
            Approve
          </Button>
          <Button
            variant="ghost" size="sm" className="gap-1.5 text-red-600 hover:bg-red-50"
            onClick={() => act(false)}
            disabled={loading !== null}
          >
            {loading === "reject" ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
            Reject
          </Button>
        </>
      ) : (
        <Button
          variant="ghost" size="sm" className="gap-1.5 text-red-600 hover:bg-red-50"
          onClick={() => act(false)}
          disabled={loading !== null}
        >
          {loading === "reject" ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
          Revoke
        </Button>
      )}
    </div>
  );
}
