import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  App,
  Card,
  Col,
  Row,
  Skeleton,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import {
  CheckCircleOutlined,
  FireOutlined,
  LineChartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { statsApi } from "../../api/stats_api";
import type { DashboardStats } from "../../features/stats_types";
import styles from "./DashboardPage.module.css";

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

export const DashboardPage = () => {
  const { notification } = App.useApp();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDashboardStats = useCallback(async () => {
    try {
      const dashboardStats = await statsApi.getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      notification.error({
        message: "Failed to load dashboard",
        description: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  }, [notification]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchDashboardStats();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [fetchDashboardStats]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!stats) {
    return (
      <Alert
        type="error"
        message="Dashboard data is unavailable"
        description="Please check backend connection and try again."
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Title level={2}>Dashboard</Title>
        <Paragraph type="secondary">
          Overview of your habit activity, completions, streaks and mood.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} className={styles.mainGrid}>
        <Col xs={24} md={12} xl={6}>
          <Card className={styles.card}>
            <Statistic
              title="Total habits"
              value={stats.totalHabits}
              prefix={<UnorderedListOutlined />}
            />
            <Text type="secondary">Created habits in your account</Text>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card className={styles.card}>
            <Statistic
              title="Total completions"
              value={stats.totalCompletions}
              prefix={<CheckCircleOutlined />}
            />
            <Text type="secondary">Completed habit records</Text>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card className={styles.card}>
            <Statistic
              title="Best streak"
              value={stats.bestStreakHabit?.bestStreak ?? 0}
              suffix="days"
              prefix={<FireOutlined />}
            />
            <Text type="secondary">
              {stats.bestStreakHabit?.name ?? "No completed habit yet"}
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card className={styles.card}>
            <Statistic
              title="Average mood"
              value={stats.averageMood}
              precision={1}
              suffix="/ 5"
              prefix={<LineChartOutlined />}
            />
            <Text type="secondary">Average mood across completions</Text>
          </Card>
        </Col>

        <Col xs={24}>
          <Card title="Best streak habit" className={styles.card}>
            {stats.bestStreakHabit ? (
              <Space direction="vertical" size="small">
                <Title level={4} style={{ margin: 0 }}>
                  {stats.bestStreakHabit.name}
                </Title>

                <Space wrap>
                  <Tag>{stats.bestStreakHabit.category}</Tag>
                  <Tag>{stats.bestStreakHabit.difficulty}</Tag>
                  <Tag color="blue">
                    Current streak: {stats.bestStreakHabit.streak}
                  </Tag>
                  <Tag color="green">
                    Best streak: {stats.bestStreakHabit.bestStreak}
                  </Tag>
                  <Tag color="purple">
                    Total completions: {stats.bestStreakHabit.totalCompletions}
                  </Tag>
                </Space>
              </Space>
            ) : (
              <Text type="secondary">
                Complete at least one habit to see your best streak habit.
              </Text>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
