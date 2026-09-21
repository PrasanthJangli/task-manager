"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      href: "/tasks",
      label: "Tasks",
      icon: <UnorderedListOutlined />,
    },
    {
      href: "/add-task",
      label: "Add Task",
      icon: <PlusCircleOutlined />,
    },
    {
      href: "/statistics",
      label: "Statistics",
      icon: <BarChartOutlined />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link href="/" className="logo">
          <span className="logo-icon">✓</span>

          <span className="logo-text">
            <span className="logo-task">Task</span>
            <span className="logo-flow">Flow</span>
          </span>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${
                  isActive ? "active" : ""
                }`}
              >
                <span className="nav-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}