"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupForm = () => {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErr(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) return setErr(error.message);
      router.push("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="space-y-3 max-w-sm">
        <h1 className="text-3xl text-center mb-5 font-semibold">Sign Up</h1>
        <input
          type="text"
          placeholder="Masukkan Email"
          value={email}
          className="border p-2 w-full"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Masukkan Password"
          value={password}
          className="border p-2 w-full"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded ml-auto w-full cursor-pointer hover:bg-blue-400"
        >
          Sign Up
        </button>
        <div className="text-center">
          <Link href={"/login"} className="text-blue-600 ">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
