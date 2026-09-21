"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "antd";

export default function TaskFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "all";

  const handleChange = (selectedStatus: string) => {
    if (selectedStatus === "all") {
      router.push("/tasks");
    } else {
      router.push(`/tasks?status=${selectedStatus}`);
    }
  };

  return (
    <div>
      <label htmlFor="status">Filter by Status: </label>

      <Select
        id="status"
        value={currentStatus}
        onChange={handleChange}
        style={{ width: 180 }}
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "in-progress", label: "In Progress" },
          { value: "completed", label: "Completed" },
        ]}
      />
    </div>
  );
}