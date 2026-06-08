import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-forest rounded-sm flex items-center justify-center mx-auto mb-4">
            <span className="text-gold font-bold text-sm">AAN</span>
          </div>
          <h1 className="text-2xl font-bold text-charcoal">Create your account</h1>
          <p className="text-muted text-sm mt-1">Or apply directly via our detailed forms below</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link href="/apply/investor" className="block p-4 bg-white border-2 border-cream-dark rounded-sm text-center hover:border-forest transition-colors">
            <p className="font-bold text-charcoal text-sm">Investor</p>
            <p className="text-muted text-xs mt-1">Join as an angel</p>
          </Link>
          <Link href="/apply/startup" className="block p-4 bg-white border-2 border-cream-dark rounded-sm text-center hover:border-forest transition-colors">
            <p className="font-bold text-charcoal text-sm">Startup</p>
            <p className="text-muted text-xs mt-1">Submit a pitch</p>
          </Link>
        </div>

        <p className="text-center text-xs text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-forest hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
