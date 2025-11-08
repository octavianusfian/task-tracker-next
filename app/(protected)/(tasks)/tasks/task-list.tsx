"use client";

import TaskItem from "@/components/task-item";
import TaskListSkeleton from "@/components/task-skeleton";
import { Task } from "@/lib/types";
import { Suspense, useState } from "react";



const TaskList = ({ tasks }: { tasks: Task[] }) => {
  // throw new Error("Boom! An error occurred");
  return (
    <>
      {tasks.length === 0 ? (
        <h2 className="text-xl my-10">
          There is no task yet, Create your task
        </h2>
      ) : (
        <Suspense fallback={<TaskListSkeleton />}>
          <ul className="space-y-2 grid grid-cols-3 gap-4 mb-8">
            {tasks.map((task: Task) => (
              <li key={task.id} className="p-4 border rounded">
                <TaskItem task={task} />
              </li>
            ))}
          </ul>
        </Suspense>
      )}
    </>
  );
};

export default TaskList;
