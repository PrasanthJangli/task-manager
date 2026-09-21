import type { Task } from "@/types/task";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Learn Next.js",
    description: "Learn Next.js fundamentals",
    status: "in-progress",
    priority: "high",
    progress: 40,
  },

  {
    id: 2,
    title: "Learn TypeScript",
    description: "Learn TypeScript fundamentals",
    status: "completed",
    priority: "medium",
    progress: 100,
  },
       
  {
    id: 3,
    title: "Build Task Manager",
    description: "Build a task manager application",
    status: "pending",
    priority: "high",
    progress: 0,
  },

  {
    id: 4,
    title: "Test Task Manager",
    description: "Testing Task manager application",
    status: "in-progress",
    priority: "high",
    progress: 60,
  },
];