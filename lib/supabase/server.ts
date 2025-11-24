import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const createServerSupabase = async () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
        // No-ops to avoid mutation in RSC
        set() {},
        remove() {},
      },
    },
  );
};

export async function getUserFromRoute() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, supabase, error };
}
