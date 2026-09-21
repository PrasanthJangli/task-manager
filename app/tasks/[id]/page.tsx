import { Button, Card, Tag, Progress } from "antd";
import Link from "next/link";
import { tasks } from "@/data/tasks";

interface TaskDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TaskDetailsPage({
  params,
}: TaskDetailsPageProps) {
  const { id } = await params;

  const task = tasks.find(
    (task) => task.id === Number(id)
  );

  if (!task) {
    return (
      <div className="task-details-page">
        <Card className="task-not-found">
          <div className="not-found-icon">!</div>

          <span className="dashboard-label">
            TASK DETAILS
          </span>

          <h1>Task Not Found</h1>

          <p>
            The task you are looking for does not exist.
          </p>

          <Link href="/tasks">
            <Button type="primary">
              ← Back to Tasks
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const statusLabel = task.status
    .replace("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  const statusClass =
    task.status === "completed"
      ? "completed"
      : task.status === "in-progress"
      ? "in-progress"
      : "pending";

  return (
    <div className="task-details-page">

      {/* Header */}
      <div className="task-details-header">
        <span className="dashboard-label">
          TASK DETAILS
        </span>

        <h1>{task.title}</h1>

        <p>
          View the details and current status of this task.
        </p>
      </div>

      {/* Main Card */}
      <Card className="task-details-card">

        {/* Top */}
        <div className="task-details-top">
          <div>
            <span className="task-id">
              TASK #{task.id}
            </span>

            <h2>{task.title}</h2>
          </div>

          <span className={`details-status ${statusClass}`}>
            <span className="status-dot" />
            {statusLabel}
          </span>
        </div>

        {/* Divider */}
        <div className="task-details-divider" />

        {/* Information */}
        <div className="task-info-grid">

          <div className="task-info-item">
            <span className="detail-label">
              TASK ID
            </span>

            <span className="detail-value">
              #{task.id}
            </span>
          </div>

          <div className="task-info-item">
            <span className="detail-label">
              STATUS
            </span>

            <span className="detail-value">
              {statusLabel}
            </span>
          </div>

          <div className="task-info-item">
            <span className="detail-label">
              TITLE
            </span>

            <span className="detail-value">
              {task.title}
            </span>
          </div>

        </div>

        {/* Progress */}
        <div className="task-details-progress">

          <div className="progress-heading">
            <div>
              <span className="detail-label">
                TASK PROGRESS
              </span>

              <p>
                Current completion status
              </p>
            </div>

            <strong>{task.progress}%</strong>
          </div>

          <Progress
            percent={task.progress}
            showInfo={false}
            size="small"
          />

        </div>

        {/* Footer */}
        <div className="task-details-footer">
          <Link href="/tasks">
            <Button>
              ← Back to Tasks
            </Button>
          </Link>
        </div>

      </Card>
    </div>
  );
}