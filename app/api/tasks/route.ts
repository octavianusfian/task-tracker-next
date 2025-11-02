import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("request", request);
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") ?? "all";
  console.log("filter", filter);

  const where =
    filter === "done"
      ? { done: true }
      : filter === "open"
      ? { done: false }
      : {};

  const tasks = await prisma.task.findMany({
    where,
    orderBy: [{ done: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const { title, description, priority } = await request.json();

  const newTask = await prisma.task.create({
    data: {
      title,
      description: description ?? "",
      priority,
    },
  });

  return NextResponse.json(
    { data: newTask, message: "Task created successfully" },
    { status: 201 }
  );
}
