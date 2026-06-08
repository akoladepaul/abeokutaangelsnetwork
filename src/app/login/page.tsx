"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error: authError, data } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setStatus("error");
      setErrorMsg(authError.message);
      return;
    }

    // Route to correct portal based on role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    const destination =
      redirect ??
      (profile?.role === "investor" ? "/portal/investor/feed" : "/portal/startup/status");

    router.push(destination);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="w-12 h-12 bg-forest rounded-sm flex items-center justify-center mx-auto">
              <span className="text-gold font-bold text-sm">AAN</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-charcoal">Sign in to your account</h1>
          <p className="text-muted text-sm mt-1">Access your investor or startup portal</p>
        </div>

        {error === "auth" && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm text-center">
            Authentication failed. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-sm border border-cream-dark p-8 flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
              Email <span className="text-gold">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
              Password <span className="text-gold">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 pr-10 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {status === "error" && (
            <p className="text-red-600 text-sm">{errorMsg}</p>
          )}

          <Button type="submit" variant="primary" size="lg" disabled={status === "loading"} className="w-full justify-center gap-2 mt-2">
            {status === "loading" && <Loader2 size={16} className="animate-spin" />}
            Sign In
          </Button>

          <p className="text-center text-xs text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-forest hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
