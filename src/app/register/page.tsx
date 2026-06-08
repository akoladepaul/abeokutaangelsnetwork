"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "investor" | "startup";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("startup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setStatus("error");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-gold" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-3">Check your email.</h1>
          <p className="text-muted leading-relaxed">
            We&apos;ve sent a confirmation link to <strong>{email}</strong>.
            Click it to activate your account and access your{" "}
            {role === "investor" ? "investor" : "startup"} portal.
          </p>
          <p className="text-muted text-sm mt-4">
            Already confirmed?{" "}
            <Link href="/login" className="text-forest hover:underline">Sign in →</Link>
          </p>
        </div>
      </div>
    );
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
          <h1 className="text-2xl font-bold text-charcoal">Create your account</h1>
          <p className="text-muted text-sm mt-1">Join Abeokuta Angels Network</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-sm border border-cream-dark p-8 flex flex-col gap-5">
          {/* Role selector */}
          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-2">
              I am joining as <span className="text-gold">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["investor", "startup"] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={cn(
                    "p-4 rounded-sm border-2 text-left transition-all",
                    role === r
                      ? "border-forest bg-forest/5"
                      : "border-cream-dark hover:border-forest/40"
                  )}
                >
                  <p className="font-bold text-charcoal text-sm capitalize">{r}</p>
                  <p className="text-muted text-xs mt-0.5">
                    {r === "investor" ? "I want to invest" : "I have a startup"}
                  </p>
                </button>
              ))}
            </div>
          </div>

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
                placeholder="Minimum 8 characters"
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

          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">
              Confirm Password <span className="text-gold">*</span>
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60"
            />
          </div>

          {status === "error" && (
            <p className="text-red-600 text-sm">{errorMsg}</p>
          )}

          <Button type="submit" variant="primary" size="lg" disabled={status === "loading"} className="w-full justify-center gap-2">
            {status === "loading" && <Loader2 size={16} className="animate-spin" />}
            Create Account
          </Button>

          <p className="text-center text-xs text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-forest hover:underline">Sign in</Link>
          </p>
          <p className="text-center text-xs text-muted/60">
            By registering you agree to our{" "}
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>{" "}
            and <Link href="/terms" className="hover:underline">Terms of Use</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}
