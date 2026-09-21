"use client";

import { Menu } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/tasks",
      icon: <UnorderedListOutlined />,
      label: "Tasks",
    },
    {
      key: "/add-task",
      icon: <PlusOutlined />,
      label: "Add Task",
    },
    {
      key: "/statistics",
      icon: <BarChartOutlined />,
      label: "Statistics",
    },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          ✓
        </div>

        <div className="sidebar-logo-text">
          <h2>TaskFlow</h2>
          <span>Student Manager</span>
        </div>
      </div>

      {/* Menu Title */}
      <div className="sidebar-menu-title">
        MENU
      </div>

      {/* Navigation */}
      <Menu
        mode="vertical"
        selectedKeys={[pathname]}
        items={items}
        onClick={({ key }) => router.push(key)}
      />

      {/* Bottom Info */}
      <div className="sidebar-bottom">
        <div className="sidebar-bottom-icon">
          ✦
        </div>

        <div>
          <span>Stay organized</span>
          <strong>Keep moving forward.</strong>
        </div>
      </div>
    </aside>
  );
}