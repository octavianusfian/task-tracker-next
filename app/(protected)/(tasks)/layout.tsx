import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabase();

  const { data } = await supabase.auth.getUser();
  console.log("tesss");
  

  if (data?.user?.email === "test@test.com") redirect("/dashboard");
  return <div>{children}</div>;
}
