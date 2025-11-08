import { Task } from "@/lib/types";
import TaskItem from "@/components/task-item";
import { Suspense } from "react";
import TaskListSkeleton from "@/components/task-skeleton";
import TaskFilter from "@/components/task-filter";
import UserInfo from "@/components/UserInfo";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function getTasks(filter: string) {
  const res = await fetch(`http://localhost:3000/api/tasks?filter=${filter}`, {
    headers: { cookie: (await headers()).get("cookie") ?? "" },
    next: { tags: ["tasks"] },
  });

  return res.json();
}

const AdminTaskPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const supabase = await createServerSupabase();

  const { data } = await supabase.auth.getUser();

  const name = data.user?.user_metadata?.full_name || data.user?.email;

  const { filter = "all" } = await searchParams;

  const tasks = await getTasks(filter);

  return (
    <div className="p-6">
      <div className="flex gap-3 items-center justify-between mb-5">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Task Tracker</h1>
          <TaskFilter />
        </div>
        <UserInfo name={name} />
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
    </div>
  );
};

export default AdminTaskPage;
