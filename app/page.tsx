
import StatsCard from "@/components/StatsCard";
import { tasks } from "@/data/tasks";
import TaskChart from "@/components/TaskChart";

export default function Home() {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const completionRate =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const statistics = [
    { title: "Total Tasks", value: total },
    { title: "Completed", value: completed },
    { title: "Pending", value: pending },
    { title: "In Progress", value: inProgress },
  ];

  return (
    <main className="dashboard">
      {/* Dashboard Header */}
      <section className="dashboard-header">
        <div>
          <span className="dashboard-label">
            TASK MANAGER
          </span>

          <h1>Dashboard</h1>

          <p>
            Track your tasks, monitor progress, and stay organized.
          </p>
        </div>

        <div className="dashboard-summary">
          <span>Overall Progress</span>
          <strong>{completionRate}%</strong>
        </div>
      </section>

      
      {/* Statistics */}
<section className="stats-container">
  <StatsCard statistics={statistics} />
</section>

      {/* Task Statistics Chart */}
      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <span className="section-label">
              ANALYTICS
            </span>

            <h2>Task Statistics</h2>

            <p>
              Visual overview of your current task status.
            </p>
          </div>
        </div>

        <TaskChart
          completed={completed}
          pending={pending}
          inProgress={inProgress}
        />
      </section>

      {/* Task Overview */}
      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <span className="section-label">
              WORKSPACE
            </span>

            <h2>Task Overview</h2>

            <p>
              Recent tasks and their current status.
            </p>
          </div>

          <span className="task-count">
            {total} Tasks
          </span>
        </div>

        <div className="task-overview">
          {tasks.map((task) => (
            <div
              className="overview-row"
              key={task.id}
            >
              <div className="overview-icon">
                {task.status === "completed"
                  ? "✓"
                  : task.status === "in-progress"
                  ? "→"
                  : "○"}
              </div>

              <div className="overview-content">
                <h3>{task.title}</h3>

                <p>{task.description}</p>
              </div>

              <span
                className={`status ${task.status}`}
              >
                {task.status === "in-progress"
                  ? "In Progress"
                  : task.status === "completed"
                  ? "Completed"
                  : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

