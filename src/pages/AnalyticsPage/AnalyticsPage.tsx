import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  App,
  Card,
  Col,
  Empty,
  List,
  Row,
  Skeleton,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import {
  CalendarOutlined,
  FireOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { statsApi } from "../../api/stats_api";
import type {
  AbandonedHabitStats,
  AnalyticsStats,
  BurnoutHabitStats,
} from "../../features/stats_types";
import styles from "./AnalyticsPage.module.css";

const { Title, Paragraph, Text } = Typography;

const getErrorMessage = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  return "Something went wrong. Please try again.";
};

const renderAbandonedList = (habits: AbandonedHabitStats[]) => {
  if (habits.length === 0) {
    return <Empty description="No abandoned habits detected" />;
  }

  return (
    <List
      className={styles.list}
      size="small"
      dataSource={habits}
      renderItem={(habit) => (
        <List.Item>
          <Space direction="vertical" size={4}>
            <Space wrap>
              <Text strong>{habit.name}</Text>
              <Tag>{habit.category}</Tag>
              <Tag>{habit.difficulty}</Tag>
            </Space>

            <Text type="secondary">
              Days since last activity: {habit.daysSince}
            </Text>
          </Space>
        </List.Item>
      )}
    />
  );
};

const renderBurnoutList = (habits: BurnoutHabitStats[]) => {
  if (habits.length === 0) {
    return <Empty description="No burnout risk detected" />;
  }

  return (
    <List
      className={styles.list}
      size="small"
      dataSource={habits}
      renderItem={(habit) => (
        <List.Item>
          <Space direction="vertical" size={4}>
            <Space wrap>
              <Text strong>{habit.name}</Text>
              <Tag>{habit.category}</Tag>
              <Tag>{habit.difficulty}</Tag>
            </Space>

            <Text type="secondary">
              Streak: {habit.streak}, completions: {habit.totalCompletions},
              difference: {habit.difference}
            </Text>
          </Space>
        </List.Item>
      )}
    />
  );
};

export const AnalyticsPage = () => {
  const { notification } = App.useApp();

  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAnalyticsStats = useCallback(async () => {
    try {
      const [
        longestStreak,
        bestDay,
        bestMonth,
        abandonedHabits,
        moodCorrelation,
        perfectDay,
        goldenMean,
        burnoutHabits,
      ] = await Promise.all([
        statsApi.getLongestStreak(),
        statsApi.getBestDay(),
        statsApi.getBestMonth(),
        statsApi.getAbandonedHabits(),
        statsApi.getMoodCorrelation(),
        statsApi.getPerfectDay(),
        statsApi.getGoldenMean(),
        statsApi.getBurnoutHabits(),
      ]);

      setStats({
        longestStreak,
        bestDay,
        bestMonth,
        abandonedHabits,
        moodCorrelation,
        perfectDay,
        goldenMean,
        burnoutHabits,
      });
    } catch (error) {
      notification.error({
        message: "Failed to load analytics",
        description: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  }, [notification]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchAnalyticsStats();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [fetchAnalyticsStats]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (!stats) {
    return (
      <Alert
        type="error"
        message="Analytics data is unavailable"
        description="Please check backend connection and try again."
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Title level={2}>Analytics</Title>
        <Paragraph type="secondary">
          Detailed insights about your habit consistency, mood, streaks and risk
          patterns.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} className={styles.grid}>
        <Col xs={24} md={12} xl={6}>
          <Card className={styles.card}>
            <Statistic
              title="Longest current streak"
              value={stats.longestStreak?.streak ?? 0}
              suffix="days"
              prefix={<FireOutlined />}
            />
            <Text type="secondary">
              {stats.longestStreak?.name ?? "No streak data yet"}
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card className={styles.card}>
            <Statistic
              title="Best weekday"
              value={stats.bestDay?.count ?? 0}
              suffix="completions"
              prefix={<CalendarOutlined />}
            />
            <Text type="secondary">
              {stats.bestDay?.dayName ?? "No weekday data yet"}
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card className={styles.card}>
            <Statistic
              title="Best month"
              value={stats.bestMonth?.completions ?? 0}
              suffix="completions"
              prefix={<TrophyOutlined />}
            />
            <Text type="secondary">
              {stats.bestMonth
                ? `${stats.bestMonth.monthName} ${stats.bestMonth.year}`
                : "No monthly data yet"}
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card className={styles.card}>
            <Statistic
              title="Perfect day"
              value={stats.perfectDay?.completions ?? 0}
              suffix="completions"
              prefix={<LineChartOutlined />}
            />
            <Text type="secondary">
              {stats.perfectDay
                ? `${stats.perfectDay.date}, mood ${stats.perfectDay.averageMood}/5`
                : "No perfect day yet"}
            </Text>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            className={styles.chartCard}
            title="Mood by difficulty"
            extra={<LineChartOutlined />}
          >
            {stats.moodCorrelation.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={stats.moodCorrelation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="difficulty" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="averageMood" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Empty description="No mood correlation data yet" />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            className={styles.card}
            title="Golden mean habit"
            extra={<TrophyOutlined />}
          >
            {stats.goldenMean ? (
              <Space direction="vertical" size="small">
                <Title level={4} style={{ margin: 0 }}>
                  {stats.goldenMean.habit.name}
                </Title>

                <Space wrap>
                  <Tag>{stats.goldenMean.habit.category}</Tag>
                  <Tag>{stats.goldenMean.habit.difficulty}</Tag>
                  <Tag color="blue">
                    Total completions: {stats.goldenMean.habit.totalCompletions}
                  </Tag>
                  <Tag color="green">
                    Average: {stats.goldenMean.averageCompletions}
                  </Tag>
                  <Tag color="purple">
                    Difference: {stats.goldenMean.difference}
                  </Tag>
                </Space>
              </Space>
            ) : (
              <Empty description="No golden mean data yet" />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            className={styles.card}
            title="Abandoned habits"
            extra={<WarningOutlined />}
          >
            {renderAbandonedList(stats.abandonedHabits)}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            className={styles.card}
            title="Burnout risk"
            extra={<ThunderboltOutlined />}
          >
            {renderBurnoutList(stats.burnoutHabits)}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
