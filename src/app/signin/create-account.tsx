"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link.");
    }

    setLoading(false);
  };

  // GOOGLE OAUTH
  const handleGoogleSignUp = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Create account</h1>

      {/* GOOGLE */}
      <button
        onClick={handleGoogleSignUp}
        disabled={loading}
        className="w-full rounded-md border px-4 py-2"
      >
        Continue with Google
      </button>

      <div className="text-center text-sm text-muted-foreground">or</div>

      {/* EMAIL */}
      <form onSubmit={handleEmailSignUp} className="space-y-4">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black text-white px-4 py-2"
        >
          {loading ? "Sending link..." : "Create account with email"}
        </button>
      </form>

      {message && (
        <p className="text-sm text-center text-muted-foreground">{message}</p>
      )}
    </div>
  );
}
