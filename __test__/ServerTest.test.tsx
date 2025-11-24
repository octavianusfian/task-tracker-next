import { createTask } from "@/app/(protected)/(tasks)/actions";
import { prisma } from "@/lib/prisma";
import { PATCH } from "@/app/api/tasks/[id]/route";
import TaskForm from "@/app/(protected)/(tasks)/task-form";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@/lib/supabase/server", () => ({
  createServerSupabase: jest.fn().mockResolvedValue({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: {
          user: { id: "user-1", email: "test@example.com", user_metadata: {} },
        },
      }),
    },
  }),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    task: {
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: any, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      body,
      json: async () => body,
    }),
  },
}));

describe("Test API", () => {
  test("createTask call prisma.add.task", async () => {
    const form = new FormData();

    form.append("title", "New Task");
    form.append("description", "");
    form.append("priority", "3");

    await createTask(
      {
        success: true,
        message: "",
      },
      form,
    );

    expect(prisma.task.create).toHaveBeenCalled();
  });

  // test("toggle done api", async () => {
  //   const body = { done: true };

  //   const req = {
  //     json: async () => ({ done: true }),
  //     headers: {
  //       get: (_name: string) => null, // or return something if your handler expects it
  //     },
  //     nextUrl: {
  //       searchParams: {
  //         get: (_key: string) => null,
  //       },
  //     },
  //   } as any;

  //   const res = await PATCH(req as any, {
  //     params: Promise.resolve({ id: "1" }),
  //   });

  //   expect(prisma.task.update).toHaveBeenCalledWith({
  //     where: { id: "1" },
  //     data: { done: true },
  //   });
  // });
});
