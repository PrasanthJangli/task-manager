import { Card, Statistic } from "antd";

type StatisticItem = {
  title: string;
  value: number;
  progress?: number;
};

type StatsCardProps = {
  statistics: StatisticItem[];
};

export default function StatsCard({
  statistics,
}: StatsCardProps) {
  return (
    <>
      {statistics.map((stat) => (
        <Card
          className="modern-stats-card"
          key={stat.title}
        >
          <div className="stats-card-top">
            <span className="stats-card-title">
              {stat.title}
            </span>

            <span className="stats-card-dot" />
          </div>

          <Statistic value={stat.value} />

          {stat.progress !== undefined && (
            <div className="stats-card-progress">
              <div
                className="stats-card-progress-bar"
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          )}
        </Card>
      ))}
    </>
  );
}