import TaskCard from "@/components/TaskCard";

type Task = {
  id: number;
  title: string;
  status: string;
};

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          status={task.status}
        />
      ))}
    </div>
  );
}