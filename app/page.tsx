import StatsCard from "@/components/StatsCard";

const tasks = [
  {
    id: 1,
    title: "Learn Next.js",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Learn TypeScript",
    status: "completed",
  },
  {
    id: 3,
    title: "Build Task Manager",
    status: "pending",
  },
];

export default function HomePage() {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  return (
    <div>
      <h1>Dashboard</h1>

      <StatsCard
        title="Total Tasks"
        value={totalTasks}
      />

      <StatsCard
        title="Completed"
        value={completedTasks}
      />

      <StatsCard
        title="Pending"
        value={pendingTasks}
      />

      <StatsCard
        title="In Progress"
        value={inProgressTasks}
      />
    </div>
  );
}