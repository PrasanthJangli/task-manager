import TaskList from "@/components/TaskList";
import { tasks } from "@/data/tasks";

export default function TasksPage() {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  return (
    <main className="tasks-page">

      {/* Header */}
      <section className="tasks-hero">
        <div className="tasks-hero-content">
          <span className="eyebrow">TASK MANAGEMENT</span>

          <h1>
            Your Tasks
            <span className="title-dot">.</span>
          </h1>

          <p>
            Organize your work, track progress, and keep everything
            moving forward.
          </p>
        </div>

        <div className="completion-card">
          <div className="completion-top">
            <span>Overall Progress</span>
            <strong>{completionRate}%</strong>
          </div>

          <div className="completion-bar">
            <div
              className="completion-fill"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <span className="completion-text">
            {completedTasks} of {totalTasks} tasks completed
          </span>
        </div>
      </section>

      {/* Statistics */}
      <section className="modern-stats">

        <div className="modern-stat-card">
          <div className="stat-card-top">
            <span className="stat-icon purple">◈</span>
            <span className="stat-label">TOTAL TASKS</span>
          </div>

          <div className="stat-value">{totalTasks}</div>

          <span className="stat-description">
            All tasks in workspace
          </span>
        </div>

        <div className="modern-stat-card">
          <div className="stat-card-top">
            <span className="stat-icon green">✓</span>
            <span className="stat-label">COMPLETED</span>
          </div>

          <div className="stat-value">{completedTasks}</div>

          <span className="stat-description">
            Successfully finished
          </span>
        </div>

        <div className="modern-stat-card">
          <div className="stat-card-top">
            <span className="stat-icon blue">→</span>
            <span className="stat-label">IN PROGRESS</span>
          </div>

          <div className="stat-value">{inProgressTasks}</div>

          <span className="stat-description">
            Currently being worked on
          </span>
        </div>

        <div className="modern-stat-card">
          <div className="stat-card-top">
            <span className="stat-icon yellow">○</span>
            <span className="stat-label">PENDING</span>
          </div>

          <div className="stat-value">{pendingTasks}</div>

          <span className="stat-description">
            Waiting to be started
          </span>
        </div>

      </section>


      {/* Task Workspace */}
      <section className="modern-task-workspace">

        <div className="workspace-header">
          <div>
            <span className="workspace-label">WORKSPACE</span>

            <h2>All Tasks</h2>

            <p>
              Review and manage your current tasks.
            </p>
          </div>

          <div className="workspace-count">
            {totalTasks} {totalTasks === 1 ? "Task" : "Tasks"}
          </div>
        </div>

        <div className="workspace-divider" />

        {/* Existing Task List */}
        <TaskList tasks={tasks} />

      </section>

    </main>
  );
}