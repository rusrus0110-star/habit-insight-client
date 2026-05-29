import { Empty, Modal, Space, Spin, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Habit, ProgressRecord } from "../habit_types";

const { Text, Title } = Typography;

type HabitProgressModalProps = {
  habit: Habit | null;
  open: boolean;
  isLoading: boolean;
  progress: ProgressRecord[];
  onCancel: () => void;
};

type ProgressChartItem = {
  date: string;
  label: string;
  completed: number;
  mood: number | null;
  notes: string;
};

const columns: ColumnsType<ProgressRecord> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => dayjs(date).format("DD.MM.YYYY"),
  },
  {
    title: "Completed",
    dataIndex: "completed",
    key: "completed",
    render: (completed: boolean) =>
      completed ? (
        <Tag color="green">Completed</Tag>
      ) : (
        <Tag color="default">Not completed</Tag>
      ),
  },
  {
    title: "Mood",
    dataIndex: "mood",
    key: "mood",
    render: (mood: number) => <Tag color="blue">{mood}/5</Tag>,
  },
  {
    title: "Note",
    dataIndex: "notes",
    key: "notes",
    render: (notes: string) =>
      notes ? <Text>{notes}</Text> : <Text type="secondary">No notes</Text>,
  },
];

const buildThirtyDayChartData = (
  progress: ProgressRecord[],
): ProgressChartItem[] => {
  const progressByDate = new Map<string, ProgressRecord>();

  progress.forEach((record) => {
    const dateKey = dayjs(record.date).format("YYYY-MM-DD");
    progressByDate.set(dateKey, record);
  });

  return Array.from({ length: 30 }, (_, index) => {
    const date = dayjs()
      .subtract(29 - index, "day")
      .format("YYYY-MM-DD");

    const record = progressByDate.get(date);

    return {
      date,
      label: dayjs(date).format("DD.MM"),
      completed: record?.completed ? 1 : 0,
      mood: record?.mood ?? null,
      notes: record?.notes ?? "",
    };
  });
};

export const HabitProgressModal = ({
  habit,
  open,
  isLoading,
  progress,
  onCancel,
}: HabitProgressModalProps) => {
  const chartData = buildThirtyDayChartData(progress);

  const completedDays = progress.filter((record) => record.completed).length;

  const averageMood =
    progress.length > 0
      ? progress.reduce((sum, record) => sum + record.mood, 0) / progress.length
      : 0;

  return (
    <Modal
      title={habit ? `Progress history: ${habit.name}` : "Progress history"}
      open={open}
      footer={null}
      onCancel={onCancel}
      width={900}
      destroyOnHidden
    >
      {isLoading ? (
        <div style={{ padding: "40px 0", textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : progress.length > 0 ? (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Space size="large" wrap>
            <div>
              <Text type="secondary">Completed days</Text>
              <Title level={4} style={{ margin: 0 }}>
                {completedDays}
              </Title>
            </div>

            <div>
              <Text type="secondary">Average mood</Text>
              <Title level={4} style={{ margin: 0 }}>
                {averageMood.toFixed(1)} / 5
              </Title>
            </div>

            <div>
              <Text type="secondary">Current streak</Text>
              <Title level={4} style={{ margin: 0 }}>
                {habit?.streak ?? 0} days
              </Title>
            </div>

            <div>
              <Text type="secondary">Best streak</Text>
              <Title level={4} style={{ margin: 0 }}>
                {habit?.bestStreak ?? 0} days
              </Title>
            </div>
          </Space>

          <div>
            <Title level={5}>Last 30 days</Title>

            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis yAxisId="left" domain={[0, 1]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="completed"
                  name="Completed"
                  barSize={18}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="mood"
                  name="Mood"
                  connectNulls
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div>
            <Title level={5}>Progress records</Title>

            <Table<ProgressRecord>
              rowKey="_id"
              columns={columns}
              dataSource={progress}
              pagination={{
                pageSize: 5,
              }}
            />
          </div>
        </Space>
      ) : (
        <Empty description="No progress records yet" />
      )}
    </Modal>
  );
};
