import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  try {
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
    const { data: userData, error } = await supabase.auth.getUser();

    if (!userData.user) throw new Error("Unauthorized");

    const body = await request.json();

    // Destructure any fields you expect
    const { title, description, priority, done } = body;

    // Build a partial update object
    const data: Record<string, any> = {};

    if (typeof title === "string") data.title = title;
    if (typeof description === "string") data.description = description;
    if (typeof priority === "number") data.priority = priority;
    if (typeof done === "boolean") data.done = done;

    // Safety: if no valid fields, return 400
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "No valid fields provided" },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: data,
    });

    return NextResponse.json(
      { data: updatedTask, message: "Task updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message: message }, { status: 500 });
  }
}
