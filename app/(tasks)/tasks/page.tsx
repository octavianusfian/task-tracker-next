import { Task } from "@/lib/types";
import TaskForm from "./task-form";
import TaskItem from "@/components/task-item";
import { Suspense } from "react";
import TaskListSkeleton from "@/components/task-skeleton";
import TaskFilter from "@/components/task-filter";

async function getTasks(filter: string) {
  const res = await fetch(`http://localhost:3000/api/tasks?filter=${filter}`, {
    next: { tags: ["tasks"] },
  });

  return res.json();
}

const TaskPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter = "all" } = await searchParams;
  console.log(filter);

  const tasks = await getTasks(filter);

  return (
    <div className="p-6">
      <div className="flex gap-3 items-center mb-3">
        <h1 className="text-2xl font-bold">Task Tracker</h1>
        <TaskFilter />
      </div>
      {tasks.length === 0 ? (
        <h2 className="text-xl">There is no task yet</h2>
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

      <TaskForm />
    </div>
  );
};

export default TaskPage;
