import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Popconfirm,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";

import type { Habit } from "../habit_types";

const { Text } = Typography;

type HabitCardProps = {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  onComplete: (habit: Habit) => void;
  onShowHistory: (habit: Habit) => void;
};

const getCategoryColor = (category: Habit["category"]) => {
  const colors: Record<Habit["category"], string> = {
    health: "green",
    education: "blue",
    productivity: "purple",
    mindfulness: "cyan",
  };

  return colors[category];
};

const getDifficultyColor = (difficulty: Habit["difficulty"]) => {
  const colors: Record<Habit["difficulty"], string> = {
    easy: "green",
    medium: "orange",
    hard: "red",
  };

  return colors[difficulty];
};

export const HabitCard = ({
  habit,
  onEdit,
  onDelete,
  onComplete,
  onShowHistory,
}: HabitCardProps) => {
  return (
    <Card
      title={habit.name}
      extra={
        <Space>
          <Tag color={getCategoryColor(habit.category)}>{habit.category}</Tag>
          <Tag color={getDifficultyColor(habit.difficulty)}>
            {habit.difficulty}
          </Tag>
        </Space>
      }
      actions={[
        <Button
          key="complete"
          type="text"
          icon={<CheckCircleOutlined />}
          onClick={() => onComplete(habit)}
        >
          Complete
        </Button>,
        <Button
          key="history"
          type="text"
          icon={<HistoryOutlined />}
          onClick={() => onShowHistory(habit)}
        >
          History
        </Button>,
        <Button
          key="edit"
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(habit)}
        >
          Edit
        </Button>,
        <Popconfirm
          key="delete"
          title="Delete habit"
          description="This will also delete all progress records for this habit."
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          onConfirm={() => onDelete(habit)}
        >
          <Button danger type="text" icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>,
      ]}
    >
      <Space size="large" wrap>
        <Statistic title="Current streak" value={habit.streak} suffix="days" />
        <Statistic title="Best streak" value={habit.bestStreak} suffix="days" />
        <Statistic title="Completed" value={habit.totalCompletions} />
      </Space>

      <div style={{ marginTop: 16 }}>
        <Text type="secondary">
          Created: {new Date(habit.createdAt).toLocaleDateString()}
        </Text>
      </div>
    </Card>
  );
};
