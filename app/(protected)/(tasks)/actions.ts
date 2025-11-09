
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase/server";
import { TaskCreateSchema } from "@/lib/validations";
import { revalidatePath, revalidateTag } from "next/cache";

type ReturnState = {
  success: boolean;
  message: string;
};

export async function createTask(_prevState: ReturnState, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;

  const supabase = await createServerSupabase();

  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Unauthorized");

  try {
    const saveData = TaskCreateSchema.parse({
      title,
      description,
      priority: Number(priority),
    });

    await prisma.task.create({
      data: {
        title: saveData.title,
        description: saveData.description ?? "",
        priority: saveData.priority,
        userId: data.user.id,
      },
    });

    revalidateTag("tasks", "max");
    console.log("success to create" + saveData.title);

    return {
      success: true,
      message: "Task created successfully",
      version: Date.now(),
    };
  } catch (error) {
    console.log("Error creating task:", error);
    // Return readable error for client
    return {
      success: false,
      message: "Failed to create task",
      version: Date.now(),
    };
  }
}

export async function toggleTaskDone(taskId: string, done: boolean) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { done },
    });
    revalidateTag("tasks", "max");
  } catch (error) {
    console.error("Error updating task:", error);
    // Handle error as needed
  }
}

export async function updateTitle(taskId: string, title: string) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { title },
    });
    revalidateTag("tasks", "max");
  } catch (error) {
    console.error("Error updating task:", error);
    // Handle error as needed
  }
}

export async function deleteTask(taskId: string) {
  try {
    const supabase = await createServerSupabase();

    const { data } = await supabase.auth.getUser();

    if (!data.user) throw new Error("Unauthorized");

    await prisma.task.delete({
      where: { id: taskId },
    });

    revalidatePath("/tasks");
  } catch (error) {
    console.log(error);
  }
}
