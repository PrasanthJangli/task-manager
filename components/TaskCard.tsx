import Link from "next/link";

type TaskCardProps = {
  id: number;
  title: string;
  status: string;
};

export default function TaskCard({
  id,
  title,
  status,
}: TaskCardProps) {
  return (
    <div className="task-card">
      <h3>{title}</h3>

      <p>
        <strong>Task ID:</strong> {id}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <Link href={`/tasks/${id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}