"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/Input";
import { useMemo, useState, useTransition } from "react";

const TaskFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") ?? "all";
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") ?? "",
  );
  const [sorting, setSorting] = useState(searchParams.get("sorting") ?? "");

  // Debounce search
  const debouncedSearch = useMemo(() => {
    let t: any;
    return (val: string) => {
      clearTimeout(t);
      t = setTimeout(() => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (!val) params.delete("search");
        else params.set("search", val);
        startTransition(() => {
          router.replace(`?${params.toString()}`);
          // router.refresh(); // ❌ not needed
        });
      }, 300);
    };
  }, [router, searchParams]);

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    if (filter === "all") params.delete("filter");
    else params.set("filter", filter);
    router.replace(`?${params.toString()}`);
    router.refresh();
  };

  const handleSort = (sort: string) => {
    setSorting(sort);
    const params = new URLSearchParams(searchParams);
    if (sort === "all") params.delete("sort");
    else params.set("sort", sort);
    router.replace(`?${params.toString()}`);
    router.refresh();
  };

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);

    debouncedSearch(searchQuery);
  };

  return (
    <div className="flex gap-3">
      <select
        value={filter}
        onChange={(e) => handleFilter(e.target.value)}
        className="border p-1"
      >
        <option value={"all"}>All</option>
        <option value={"done"}>Done</option>
        <option value={"open"}>Open</option>
      </select>
      <select
        value={sorting}
        onChange={(e) => handleSort(e.target.value)}
        className="border p-1"
      >
        <option value="" disabled hidden>
          Sort by...
        </option>
        <option value={"date"}>Sort by Date</option>
        <option value={"title"}>Sort by Title</option>
      </select>
      <Input
        placeholder="Search Task..."
        onChange={(e) => handleSearch(e.target.value)}
        value={searchQuery}
      />
    </div>
  );
};

export default TaskFilter;
