import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-forest rounded-sm flex items-center justify-center mx-auto mb-4">
            <span className="text-gold font-bold text-sm">AAN</span>
          </div>
          <h1 className="text-2xl font-bold text-charcoal">Sign in to your account</h1>
          <p className="text-muted text-sm mt-1">Access your investor or startup portal</p>
        </div>

        <form className="bg-white rounded-sm border border-cream-dark p-8 flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">Email</label>
            <input type="email" required className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60" />
          </div>
          <div>
            <label className="text-xs font-medium text-charcoal/70 uppercase tracking-wider block mb-1.5">Password</label>
            <input type="password" required className="w-full px-3 py-2.5 text-sm border border-cream-dark rounded-sm bg-cream focus:outline-none focus:border-forest/60" />
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full justify-center mt-2">Sign In</Button>
          <p className="text-center text-xs text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-forest hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
