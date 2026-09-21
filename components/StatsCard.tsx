import { Card, Statistic } from "antd";

type StatsCardProps = {
  title: string;
  value: number;
  progress?: number;
};

export default function StatsCard({
  title,
  value,
  progress,
}: StatsCardProps) {
  return (
    <Card className="modern-stats-card">
      <div className="stats-card-top">
        <span className="stats-card-title">
          {title}
        </span>

        <span className="stats-card-dot" />
      </div>

      <Statistic value={value} />

      {progress !== undefined && (
        <div className="stats-card-progress">
          <div
            className="stats-card-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </Card>
  );
}