
"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

type TaskChartProps = {
  completed: number;
  pending: number;
  inProgress: number;
};

export default function TaskChart({
  completed,
  pending,
  inProgress,
}: TaskChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: "Task Statistics",
      },

      tooltip: {},

      xAxis: {
        type: "category",
        data: ["Completed", "Pending", "In Progress"],
      },

      yAxis: {
        type: "value",
      },

      series: [
        {
          name: "Tasks",
          type: "bar",
          data: [completed, pending, inProgress],
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [completed, pending, inProgress]);

  return <div ref={chartRef} className="task-chart" />;
}

