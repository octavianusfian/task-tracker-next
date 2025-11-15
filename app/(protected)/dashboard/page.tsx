import UserInfo from "@/components/UserInfo";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const AdminDashboard = async () => {
  const supabase = await createServerSupabase();

  const { data } = await supabase.auth.getUser();
  const name = data.user?.user_metadata?.full_name || data.user?.email;

  if (data?.user?.email !== "test@test.com") redirect("/");
  return (
    <main className="p-6 flex justify-between">
      <h1>Dashboard</h1>
      <UserInfo name={name} />
    </main>
  );
};

export default AdminDashboard;
