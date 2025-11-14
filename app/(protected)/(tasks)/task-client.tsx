"use client";

import { Task } from "@/lib/types";
import TaskForm from "./task-form";
import TaskList from "./task-list";
import { useEffect, useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function FallbackComponent({ error }: FallbackProps) {
  return (
    <div>
      <h2 className="text-2xl font-medium">Something went wrong 😢</h2>
      <p>{error.message}</p>
    </div>
  );
}

const TaskClient = ({ initialTasks }: { initialTasks: Task[] }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    console.log("Triggers", initialTasks);

    setTasks(initialTasks);
  }, [initialTasks]);

  const handleAddOptimisticTask = (task: Task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  return (
    <>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <TaskList tasks={tasks} />
      </ErrorBoundary>

      <TaskForm addOptimisticTask={handleAddOptimisticTask} />
    </>
  );
};

export default TaskClient;
