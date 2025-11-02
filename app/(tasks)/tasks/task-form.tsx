"use client";

import { TaskCreateSchema } from "@/lib/validations";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import z from "zod";
import { createTask } from "../actions";
import { create } from "domain";

const TaskForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(createTask, {
    success: false,
    message: "",
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<string>("3");

  useEffect(() => {
    if (state.success) {
      // 1) reset the form
      formRef.current?.reset();

      // 2) refresh server components so tagged fetch runs again
      router.refresh();

      setTitle("");
      setDescription("");
      setPriority("3");
    }
  }, [state.success, router]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      description,
      priority: Number(priority),
    };

    try {
      const sendData = TaskCreateSchema.parse(data);
      const res = await axios.post("/api/tasks", sendData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      
      setTitle("");
      setDescription("");
      setPriority("3");
      startTransition(() => router.refresh());
    } catch (error) {
      if (error instanceof Error) {
        alert("Error: " + error.message);
      } else if (error instanceof z.ZodError) {
        alert(
          "Validation Error: " +
            error.issues.map((issue) => issue.message).join(", ")
        );
      }
    }
  };
  return (
    <div className="mt-8 py-6 px-10 border rounded">
      <h1 className="text-2xl font-semibold mb-8">Task Form</h1>
      {state.success === false && state.message && (
        <p className="mb-4 text-red-600">{state.message}</p>
      )}
      {state.success === true && state.message && (
        <p className="mb-4 text-green-600">{state.message}</p>
      )}
      <form action={formAction} ref={formRef} className="space-y-4 w-1/3">
        <div className="flex gap-4 items-center">
          <label htmlFor="title" className="w-[100px]">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="border p-2 rounded grow"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="title" className="w-[100px]">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="border p-2 rounded grow"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="title" className="w-[100px]">
            Priority:
          </label>
          <select
            id="priority"
            name="priority"
            required
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
            className="border p-2 rounded"
          >
            <option value="1">Very Low</option>
            <option value="2">Low</option>
            <option value="3">Medium</option>
            <option value="4">High</option>
            <option value="5">Very High</option>
          </select>
        </div>
        <button
          type="submit"
          className="p-2 rounded bg-blue-600 text-white font-medium cursor-pointer"
          disabled={isPending}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
