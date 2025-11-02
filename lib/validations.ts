import z from "zod";

export const TaskCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().optional(),
  priority: z.number().min(0).max(5),
});

export const TaskUpdateSchema = TaskCreateSchema.partial().extend({
  id: z.string().uuid(),
});
