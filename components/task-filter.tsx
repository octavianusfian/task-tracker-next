"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const TaskFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get("filter") ?? "all";

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    if (filter === "all") params.delete("filter");
    else params.set("filter", filter);
    router.replace(`?${params.toString()}`);
    router.refresh();
  };

  return (
    <div>
      <select
        value={value}
        onChange={(e) => handleFilter(e.target.value)}
        className="border p-1"
      >
        <option value={"all"}>All</option>
        <option value={"done"}>Done</option>
        <option value={"open"}>Open</option>
      </select>
    </div>
  );
};

export default TaskFilter;
