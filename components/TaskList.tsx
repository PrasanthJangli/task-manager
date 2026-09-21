
"use client";

import { useMemo, useState } from "react";
import { Col, Row, Select } from "antd";

import TaskCard from "@/components/TaskCard";
import type { Task } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    if (filter === "all") {
      return tasks;
    }

    return tasks.filter(
      (task) => task.status === filter
    );
  }, [tasks, filter]);

  return (
    <div className="task-list-wrapper">

      {/* Task List Header */}
      <div className="task-list-heading">
        <div>
          <span className="dashboard-label">
            TASK LIST
          </span>

          <h2>All Tasks</h2>

          <p>
            View and manage your tasks by status.
          </p>
        </div>

        {/* Status Dropdown */}
        <Select
          value={filter}
          onChange={setFilter}
          className="task-list-select"
          size="large"
          options={[
            {
              value: "all",
              label: "All Tasks",
            },
            {
              value: "completed",
              label: "Completed",
            },
            {
              value: "in-progress",
              label: "In Progress",
            },
            {
              value: "pending",
              label: "Pending",
            },
          ]}
        />
      </div>

      {/* Task Count */}
      <div className="task-list-count">
        {filteredTasks.length}{" "}
        {filteredTasks.length === 1 ? "Task" : "Tasks"}
      </div>

      {/* Task Cards */}
      <Row gutter={[16, 16]}>
        {filteredTasks.map((task) => (
          <Col
            key={task.id}
            xs={24}
            sm={12}
            lg={8}
          >
            <TaskCard
              id={task.id}
              title={task.title}
              status={task.status}
              progress={task.progress}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

