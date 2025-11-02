import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  try {
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
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
