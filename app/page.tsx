"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Priority = "High" | "Medium" | "Low";
type Filter = "All" | "Pending" | "Completed";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
};

const PRIORITIES: Priority[] = ["High", "Medium", "Low"];

const priorityClass: Record<Priority, string> = {
  High: "priority-high",
  Medium: "priority-medium",
  Low: "priority-low",
};

function getTodayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(dateString: string) {
  if (!dateString) return "No due date";

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDateStatus(dueDate: string, completed: boolean) {
  if (completed) {
    return {
      text: "Completed",
      className: "date-completed",
    };
  }

  if (!dueDate) {
    return {
      text: "No due date",
      className: "",
    };
  }

  const today = getTodayKey();

  if (dueDate < today) {
    return {
      text: "Overdue",
      className: "date-overdue",
    };
  }

  if (dueDate === today) {
    return {
      text: "Due Today",
      className: "date-today",
    };
  }

  return {
    text: "Upcoming",
    className: "date-upcoming",
  };
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [dueDate, setDueDate] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | Priority>("All");
  const [sortBy, setSortBy] = useState("due");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const [calendarDate, setCalendarDate] = useState(new Date());

  /* ---------------- Load / Save ---------------- */

  useEffect(() => {
    const savedTasks = localStorage.getItem("student-task-manager-tasks");
    const savedTheme = localStorage.getItem("student-task-manager-theme");

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch {
        setTasks([]);
      }
    }

    if (savedTheme === "dark") {
      setDarkMode(true);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      "student-task-manager-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks, mounted]);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      "student-task-manager-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode, mounted]);

  /* ---------------- Stats ---------------- */

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const overdueTasks = tasks.filter(
    (task) =>
      !task.completed &&
      task.dueDate &&
      task.dueDate < getTodayKey()
  ).length;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  /* ---------------- Add / Edit ---------------- */

  function resetForm() {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setEditingId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (editingId !== null) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editingId
            ? {
                ...task,
                title: title.trim(),
                description: description.trim(),
                priority,
                dueDate,
              }
            : task
        )
      );

      resetForm();
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((current) => [newTask, ...current]);

    resetForm();
  }

  function editTask(task: Task) {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(task.dueDate);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function deleteTask(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed
                ? new Date().toISOString()
                : undefined,
            }
          : task
      )
    );
  }

  /* ---------------- Filtering ---------------- */

  const filteredTasks = useMemo(() => {
    const result = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filter === "All" ||
        (filter === "Completed" && task.completed) ||
        (filter === "Pending" && !task.completed);

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    return result.sort((a, b) => {
      if (sortBy === "priority") {
        const order = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        return order[a.priority] - order[b.priority];
      }

      if (sortBy === "created") {
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return a.dueDate.localeCompare(b.dueDate);
    });
  }, [tasks, search, filter, priorityFilter, sortBy]);

  /* ---------------- Streak ---------------- */

  const streak = useMemo(() => {
    const completedDays = new Set(
      tasks
        .filter((task) => task.completedAt)
        .map((task) => task.completedAt!.slice(0, 10))
    );

    let count = 0;
    const date = new Date();

    while (true) {
      const key = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      if (!completedDays.has(key)) break;

      count++;

      date.setDate(date.getDate() - 1);
    }

    return count;
  }, [tasks]);

  /* ---------------- Calendar ---------------- */

  const calendarYear = calendarDate.getFullYear();
  const calendarMonth = calendarDate.getMonth();

  const firstDay = new Date(
    calendarYear,
    calendarMonth,
    1
  ).getDay();

  const daysInMonth = new Date(
    calendarYear,
    calendarMonth + 1,
    0
  ).getDate();

  const calendarDays = Array.from(
    { length: firstDay + daysInMonth },
    (_, index) => {
      if (index < firstDay) return null;
      return index - firstDay + 1;
    }
  );

  function previousMonth() {
    setCalendarDate(
      new Date(calendarYear, calendarMonth - 1, 1)
    );
  }

  function nextMonth() {
    setCalendarDate(
      new Date(calendarYear, calendarMonth + 1, 1)
    );
  }

  function getCalendarTaskCount(day: number) {
    const key = `${calendarYear}-${String(calendarMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    return tasks.filter((task) => task.dueDate === key).length;
  }

  /* ---------------- UI ---------------- */

  return (
    <main className={darkMode ? "app dark" : "app"}>
      <div className="page-container">
        {/* Header */}

        <header className="hero">
          <div>
            <span className="hero-badge">🎓 STUDENT PRODUCTIVITY</span>

            <h1>Student Task Manager</h1>

            <p>
              Organize your studies, track deadlines and stay productive.
            </p>
          </div>

          <button
            className="theme-button"
            onClick={() => setDarkMode((value) => !value)}
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </header>

        {/* Stats */}

        <section className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon">📚</div>
            <div>
              <span>Total Tasks</span>
              <strong>{totalTasks}</strong>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">⏳</div>
            <div>
              <span>Pending</span>
              <strong>{pendingTasks}</strong>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">✓</div>
            <div>
              <span>Completed</span>
              <strong>{completedTasks}</strong>
            </div>
          </div>

          <div className="stat-card red">
            <div className="stat-icon">⚠</div>
            <div>
              <span>Overdue</span>
              <strong>{overdueTasks}</strong>
            </div>
          </div>
        </section>

        {/* Progress */}

        <section className="dashboard-grid">
          <div className="panel progress-panel">
            <div className="panel-title">
              <div>
                <h2>📈 Overall Progress</h2>
                <p>Your current productivity level</p>
              </div>

              <strong className="percentage">
                {completionPercentage}%
              </strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <div className="progress-footer">
              <span>{completedTasks} completed</span>
              <span>{pendingTasks} remaining</span>
            </div>
          </div>

          <div className="panel streak-panel">
            <div className="streak-icon">🔥</div>

            <div>
              <span>Study Streak</span>
              <strong>{streak} Days</strong>
              <p>Keep completing tasks every day!</p>
            </div>
          </div>
        </section>

        {/* Add Task */}

        <section className="panel add-panel">
          <div className="section-heading">
            <div>
              <span className="section-label">
                {editingId ? "EDIT TASK" : "CREATE TASK"}
              </span>

              <h2>
                {editingId ? "✏️ Edit Task" : "➕ Add New Task"}
              </h2>
            </div>

            {editingId && (
              <button
                className="cancel-button"
                onClick={resetForm}
                type="button"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Task Title</label>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Example: Complete Java assignment"
              />
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Enter task details..."
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Priority</label>

                <select
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value as Priority)
                  }
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="form-group">
                <label>Due Date</label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) =>
                    setDueDate(event.target.value)
                  }
                />
              </div>
            </div>

            <button className="primary-button" type="submit">
              {editingId ? "✓ Update Task" : "+ Add Task"}
            </button>
          </form>
        </section>

        {/* Task Manager */}

        <section className="panel">
          <div className="section-heading task-heading">
            <div>
              <span className="section-label">YOUR WORK</span>
              <h2>📋 My Tasks</h2>
            </div>

            <span className="task-count">
              {filteredTasks.length} tasks
            </span>
          </div>

          <div className="filters">
            <div className="search-box">
              🔎
              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search tasks..."
              />
            </div>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value as Filter)
              }
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(
                  event.target.value as "All" | Priority
                )
              }
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="due">Sort: Due Date</option>
              <option value="priority">Sort: Priority</option>
              <option value="created">Sort: Newest</option>
              <option value="title">Sort: Title</option>
            </select>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <div>📝</div>
                <h3>No tasks found</h3>
                <p>
                  Add a task or change your filters to see tasks here.
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const dateStatus = getDateStatus(
                  task.dueDate,
                  task.completed
                );

                return (
                  <article
                    className={
                      task.completed
                        ? "task-card completed"
                        : "task-card"
                    }
                    key={task.id}
                  >
                    <button
                      className={
                        task.completed
                          ? "check-button checked"
                          : "check-button"
                      }
                      onClick={() => toggleTask(task.id)}
                      aria-label="Toggle task"
                    >
                      {task.completed ? "✓" : ""}
                    </button>

                    <div className="task-content">
                      <div className="task-top">
                        <h3>{task.title}</h3>

                        <span
                          className={`priority-badge ${priorityClass[
                            task.priority
                          ]}`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {task.description && (
                        <p>{task.description}</p>
                      )}

                      <div className="task-meta">
                        <span className={dateStatus.className}>
                          📅 {formatDate(task.dueDate)}
                        </span>

                        <span className={dateStatus.className}>
                          {dateStatus.text}
                        </span>
                      </div>
                    </div>

                    <div className="task-actions">
                      <button
                        onClick={() => editTask(task)}
                        className="icon-button edit"
                        title="Edit"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="icon-button delete"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* Calendar */}

        <section className="panel">
          <div className="section-heading">
            <div>
              <span className="section-label">DEADLINE PLANNER</span>
              <h2>🗓️ Task Calendar</h2>
            </div>

            <div className="calendar-controls">
              <button onClick={previousMonth}>‹</button>

              <strong>
                {calendarDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </strong>

              <button onClick={nextMonth}>›</button>
            </div>
          </div>

          <div className="calendar">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <div className="calendar-weekday" key={day}>
                  {day}
                </div>
              )
            )}

            {calendarDays.map((day, index) => {
              if (day === null) {
                return (
                  <div
                    className="calendar-day empty"
                    key={`empty-${index}`}
                  />
                );
              }

              const count = getCalendarTaskCount(day);

              const isToday =
                `${calendarYear}-${String(calendarMonth + 1).padStart(
                  2,
                  "0"
                )}-${String(day).padStart(2, "0")}` ===
                getTodayKey();

              return (
                <div
                  className={
                    isToday
                      ? "calendar-day today"
                      : "calendar-day"
                  }
                  key={day}
                >
                  <span>{day}</span>

                  {count > 0 && (
                    <small>
                      {count} {count === 1 ? "task" : "tasks"}
                    </small>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Analytics */}

        <section className="dashboard-grid analytics-grid">
          <div className="panel">
            <div className="section-heading">
              <div>
                <span className="section-label">ANALYTICS</span>
                <h2>📊 Task Breakdown</h2>
              </div>
            </div>

            <div className="analytics-list">
              {PRIORITIES.map((level) => {
                const count = tasks.filter(
                  (task) => task.priority === level
                ).length;

                const percentage =
                  totalTasks === 0
                    ? 0
                    : Math.round((count / totalTasks) * 100);

                return (
                  <div className="analytics-item" key={level}>
                    <div>
                      <span>{level}</span>
                      <strong>{count}</strong>
                    </div>

                    <div className="analytics-track">
                      <div
                        className={`analytics-fill ${priorityClass[level]}`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="panel tips-panel">
            <div className="section-heading">
              <div>
                <span className="section-label">PRODUCTIVITY</span>
                <h2>💡 Smart Tips</h2>
              </div>
            </div>

            <div className="tip">
              <span>🎯</span>
              <p>Break large assignments into smaller tasks.</p>
            </div>

            <div className="tip">
              <span>🔥</span>
              <p>Complete at least one task every day.</p>
            </div>

            <div className="tip">
              <span>⏰</span>
              <p>Finish high-priority tasks before deadlines.</p>
            </div>
          </div>
        </section>

        <footer>
          <p>
            Student Task Manager • Built with Next.js & TypeScript
          </p>
        </footer>
      </div>
    </main>
  );
}
