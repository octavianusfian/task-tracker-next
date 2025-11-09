export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { createSupabaseForRoute } from "@/lib/supabase/route";
import { createServerSupabase, getUserFromRoute } from "@/lib/supabase/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") ?? "all";

  const cookieHeader = request.headers.get("cookie") ?? "";

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // split "sb-...=..." pairs into array objects
          return cookieHeader
            .split(";")
            .map((c) => c.trim())
            .filter(Boolean)
            .map((c) => {
              const [name, ...rest] = c.split("=");
              return { name, value: rest.join("=") };
            });
        },
        setAll() {}, // no-op (we only read cookies here)
      },
    }
  );

  // 3️⃣ get user from cookies
  const { data, error } = await supabase.auth.getUser();

  const where = {
    userId: data.user?.id,
    ...(filter === "done"
      ? { done: true }
      : filter === "open"
      ? { done: false }
      : {}),
  };

  const tasks = await prisma.task.findMany({
    where,
    orderBy: [{ done: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const { title, description, priority } = await request.json();
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getUser();

  if (!data.user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const newTask = await prisma.task.create({
    data: {
      title,
      description: description ?? "",
      priority,
      userId: data.user.id,
    },
  });

  return NextResponse.json(
    { data: newTask, message: "Task created successfully" },
    { status: 201 }
  );
}
