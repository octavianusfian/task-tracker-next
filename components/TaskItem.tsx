"use client";
export const runtime = "nodejs";

import { Task } from "@/lib/types";
import { useState, useTransition } from "react";
import { deleteTask, toggleTaskDone } from "../app/(protected)/(tasks)/actions";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Button from "./ui/Button";
import { Input } from "./ui/Input";
import Link from "next/link";
import React from "react";

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

const TaskItem = ({
  task,
  onOptimisticDelete,
}: {
  task: Task;
  onOptimisticDelete: (id: string) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [optimisticDone, setOptimisticDone] = useState(task.done);
  const [newTitle, setNewTitle] = useState(task.title);
  const router = useRouter();

  const handleSaveNewTitle = async () => {
    setEditing(false);
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
      toast.success(res.data.message);
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
      setEditing(true);
    }
  };

  const handleDelete = async () => {
    onOptimisticDelete(task.id);
    startTransition(async () => {
      try {
        await deleteTask(task.id);
        toast.success("Delete task succeded");
      } catch (error) {
        router.refresh();
        toast.error("Delete task failed");
      }
    });
  };

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const done = e.target.checked;
    setOptimisticDone(done);
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
      toast.success(res.data.message);

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setOptimisticDone(!done);
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
          <Input
            type="checkbox"
            checked={optimisticDone}
            onChange={(e) => handleToggle(e)}
            className={`h-5 w-5 accent-blue-600 cursor-pointer disabled:opacity-60`}
          />
        )}
        {editing ? (
          <div className="flex ms-2 space-x-2">
            <Input
              value={newTitle}
              className=" me-2"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button
              onClick={() => handleSaveNewTitle()}
              disabled={isPending}
              size="small"
            >
              Save
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setEditing(false);
                setNewTitle(task.title);
              }}
              disabled={isPending}
              size="small"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <span
            className={`ms-2 text-xl font-medium ${
              task.done ? "line-through opacity-60" : ""
            }`}
            onClick={() => {
              if (!task.done) {
                setEditing(true);
              }
            }}
          >
            {newTitle}
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
      <div className="flex justify-between items-center">
        <p>Last updated: {new Date(task.updatedAt).toLocaleString()}</p>
        <Link href={`/${task.id}`}>
          <Button variant="secondary" size="small">
            Detail
          </Button>
        </Link>
      </div>

      {!editing && (
        <div>
          <Button
            className="absolute right-0 top-0"
            variant="danger"
            size="small"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(TaskItem);
