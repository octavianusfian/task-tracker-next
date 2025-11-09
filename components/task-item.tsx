"use client";
export const runtime = "nodejs";

import { Task } from "@/lib/types";
import { useState, useTransition } from "react";
import { deleteTask, toggleTaskDone } from "../app/(protected)/(tasks)/actions";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const priorityColors: Record<number, string> = {
  1: "text-gray-500",
  2: "text-yellow-500",
  3: "text-green-500",
  4: "text-blue-500",
  5: "text-red-500",
};

const priorityLabels: Record<number, string> = {
  1: "Very Low",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "Very High",
};

const TaskItem = ({ task }: { task: Task }) => {
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const router = useRouter();

  const handleSaveNewTitle = async () => {
    try {
      const res = await axios.patch(
        `/api/tasks/${task.id}`,
        { title: newTitle },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEditing(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error occurred");
      }
    }
  };

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const done = e.target.checked;

    try {
      const res = await axios.patch(
        `/api/tasks/${task.id}`,
        { done },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error occurred");
      }
    }
  };

  return (
    <div className="space-y-1 relative">
      <div className="flex gap-2 items-center">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
        ) : (
          <input
            type="checkbox"
            checked={task.done}
            onChange={(e) => handleToggle(e)}
            className={`h-5 w-5 accent-blue-600 cursor-pointer disabled:opacity-60`}
          />
        )}
        {editing ? (
          <div className="inline ms-2 space-x-2">
            <input
              value={newTitle}
              className="p-1 border me-2"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button
              onClick={() => handleSaveNewTitle()}
              className={` p-1 rounded text-white ${
                isPending
                  ? "bg-blue-400 cursor-not-allowed opacity-70"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
              }`}
              disabled={isPending}
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className={` p-1 rounded text-white  ${
                isPending
                  ? "bg-red-400 cursor-not-allowed opacity-70"
                  : "bg-red-600 hover:bg-red-700 active:bg-red-800 cursor-pointer"
              }`}
              disabled={isPending}
            >
              Cancel
            </button>
          </div>
        ) : (
          <span
            className={`ms-2 text-xl font-medium ${
              task.done ? "line-through opacity-60" : ""
            }`}
            onClick={() => setEditing(true)}
          >
            {task.title}
          </span>
        )}
      </div>

      {task.description && <p className="text-gray-600">{task.description}</p>}
      <p
        className={`text-sm ${
          priorityColors[task.priority ?? "1"] ?? "text-gray-400"
        }`}
      >
        Priority: {priorityLabels[task.priority ?? "1"] ?? "Unknown"}
      </p>
      <p
        className={`opacity-70 text-sm inline p-1 ${
          task.done ? "bg-green-400" : "bg-blue-400"
        }`}
      >
        {task.done ? "Done" : "Open"}
      </p>
      {isPending && <span className="text-xs opacity-60 ms-2">Saving…</span>}
      <p>Last updated: {new Date(task.updatedAt).toLocaleString()}</p>

      <button
        className="text-red-600 absolute right-1 top-1 cursor-pointer"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
