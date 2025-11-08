"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return setErr(error.message);
      toast.success("Login successful!");

      router.push("/tasks");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    setErr(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback?next=/tasks`,
        },
      });
      if (error) return setErr(error.message);
      toast.success("Login successful!");
      router.push("/tasks");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="space-y-3 max-w-sm">
        <h1 className="text-3xl text-center mb-5 font-semibold">Login</h1>
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
          type="submit"
          className="p-2 bg-blue-500 text-white rounded ml-auto w-full cursor-pointer hover:bg-blue-400"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleLoginWithGoogle}
          className="p-2 bg-green-700 text-white rounded ml-auto w-full cursor-pointer hover:bg-green-600"
        >
          Sign with Google
        </button>
        <div className="text-center">
          <Link href={"/signup"} className="text-blue-600 ">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
