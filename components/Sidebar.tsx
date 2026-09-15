import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <nav>
        <Link href="/">Dashboard</Link>
        <Link href="/tasks">Tasks</Link>
      </nav>
    </aside>
  );
}