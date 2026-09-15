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
export default async function TaskDetailsPage({ params }) {
  const { id } = await params;

  const task = tasks.find(
    (task) => task.id === Number(id)
  );
  if (!task) {
    return <h1>Task not found</h1>;
  }
  return (
    <div>
      <h1>Task Details</h1>

      <h2>{task.title}</h2>

      <p>ID: {task.id}</p>

      <p>Status: {task.status}</p>
    </div>
  );
}