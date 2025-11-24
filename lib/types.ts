import z from "zod";
import { TaskUpdateSchema } from "./validations";

export type Task = z.infer<typeof TaskUpdateSchema> & {
  done: boolean;
  updatedAt: Date;
};
