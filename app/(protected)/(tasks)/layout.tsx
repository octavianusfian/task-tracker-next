import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabase();

  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");
  return <div>{children}</div>;
}
