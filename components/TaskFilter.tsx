"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TaskFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "all";

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedStatus = event.target.value;

    if (selectedStatus === "all") {
      router.push("/tasks");
    } else {
      router.push(`/tasks?status=${selectedStatus}`);
    }
  };

  return (
    <div>
      <label htmlFor="status">Filter by Status: </label>

      <select
        id="status"
        value={currentStatus}
        onChange={handleChange}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}