import TaskFilter from "@/components/TaskFilter";
import UserInfo from "@/components/UserInfo";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import TaskList from "./task-list";
import TaskClient from "./task-client";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { cache } from "react";

const getTasks = cache(
  async (filter: string, searchQuery: string, sorting: string) => {
    const baseUrl = getBaseUrl();

    const res = await fetch(
      `${baseUrl}/api/tasks?filter=${filter}&search=${searchQuery}&sort=${sorting}`,
      {
        headers: { cookie: (await headers()).get("cookie") ?? "" },
        next: { tags: ["tasks"] },
      },
    );

    return res.json();
  },
);

const TaskPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; search?: string; sort?: string }>;
}) => {
  const supabase = await createServerSupabase();

  const { data } = await supabase.auth.getUser();

  const name = data.user?.user_metadata?.full_name || data.user?.email;

  const { filter = "all" } = await searchParams;
  const { search = "" } = await searchParams;
  const { sort = "" } = await searchParams;

  const tasks = await getTasks(filter, search, sort);
  console.log(tasks);

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
