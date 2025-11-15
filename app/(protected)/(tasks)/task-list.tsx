"use client";

import TaskItem from "@/components/TaskItem";
import TaskListSkeleton from "@/components/TaskSkeleton";
import { Task } from "@/lib/types";
import { Suspense, useCallback, useEffect, useState } from "react";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [currTasks, setCurrTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    setCurrTasks(tasks);
  }, [tasks]);

  const handleDeleteTask = useCallback(
    (id: string) => {
      setCurrTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [tasks]
  );
  // throw new Error("Boom! An error occurred");
  return (
    <>
      {currTasks.length === 0 ? (
        <h2 className="text-xl my-10">
          There is no task yet, Create your task
        </h2>
      ) : (
        <Suspense fallback={<TaskListSkeleton />}>
          <ul className="space-y-2 grid grid-cols-3 gap-4 mb-8">
            {currTasks.map((task: Task) => (
              <li key={task.id} className="p-4 border rounded">
                <TaskItem task={task} onOptimisticDelete={handleDeleteTask} />
              </li>
            ))}
          </ul>
        </Suspense>
      )}
    </>
  );
};

export default TaskList;
