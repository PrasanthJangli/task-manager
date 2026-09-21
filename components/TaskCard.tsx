import Link from "next/link";
import { Card, Button, Progress, Tag } from "antd";

type TaskCardProps = {
  id: number;
  title: string;
  status: string;
  progress: number;
};

export default function TaskCard({
  id,
  title,
  status,
  progress,
}: TaskCardProps) {
  const statusColor =
    status === "completed"
      ? "green"
      : status === "in-progress"
      ? "blue"
      : "orange";

  const statusLabel =
    status === "in-progress"
      ? "In Progress"
      : status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Card className="task-card">
      <span className="task-id">TASK #{id}</span>

      <h3>{title}</h3>

      <div className="task-status">
        <span>Status</span>

        <Tag color={statusColor}>
          {statusLabel}
        </Tag>
      </div>

      <div className="task-progress">
        <div className="task-progress-header">
          <span>Progress</span>
          <strong>{progress}%</strong>
        </div>

        <Progress
          percent={progress}
          showInfo={false}
          size="small"
        />
      </div>

      <div className="task-card-footer">
        <Link href={`/tasks/${id}`}>
          <Button type="primary">
            View Details →
          </Button>
        </Link>
      </div>
    </Card>
  );
}