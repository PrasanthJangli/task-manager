import TaskFilter from "@/components/TaskFilter";
import TaskList from "@/components/TaskList";

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

type TasksPageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function TasksPage({
  searchParams,
}: TasksPageProps) {
  const params = await searchParams;

  const selectedStatus = params.status || "all";

  const filteredTasks =
    selectedStatus === "all"
      ? tasks
      : tasks.filter(
          (task) => task.status === selectedStatus
        );

  return (
    <div>
      <h1>Task List</h1>

      <TaskFilter />

      <TaskList tasks={filteredTasks} />
    </div>
  );
}