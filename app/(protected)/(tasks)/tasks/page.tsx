import { Task } from "@/lib/types";
import TaskForm from "./task-form";
import TaskItem from "@/components/task-item";
import { Suspense } from "react";
import TaskListSkeleton from "@/components/task-skeleton";
import TaskFilter from "@/components/task-filter";
import UserInfo from "@/components/UserInfo";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import TaskList from "./task-list";
import TaskClient from "./task-client";
import { getBaseUrl } from "@/lib/getBaseUrl";

async function getTasks(filter: string) {
  const baseUrl = getBaseUrl();
  console.log(baseUrl);
  
  const res = await fetch(`${baseUrl}/api/tasks?filter=${filter}`, {
    headers: { cookie: (await headers()).get("cookie") ?? "" },
    next: { tags: ["tasks"] },
  });

  return res.json();
}

const TaskPage = async ({
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
      <TaskClient initialTasks={tasks} />
    </div>
  );
};

export default TaskPage;
