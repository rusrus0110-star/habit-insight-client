import { Empty, Modal, Spin, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import type { Habit, ProgressRecord } from "../habit_types";

const { Text } = Typography;

type HabitProgressModalProps = {
  habit: Habit | null;
  open: boolean;
  isLoading: boolean;
  progress: ProgressRecord[];
  onCancel: () => void;
};

const columns: ColumnsType<ProgressRecord> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => dayjs(date).format("DD.MM.YYYY"),
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

export const HabitProgressModal = ({
  habit,
  open,
  isLoading,
  progress,
  onCancel,
}: HabitProgressModalProps) => {
  return (
    <Modal
      title={habit ? `Progress history: ${habit.name}` : "Progress history"}
      open={open}
      footer={null}
      onCancel={onCancel}
      width={760}
      destroyOnHidden
    >
      {isLoading ? (
        <div style={{ padding: "40px 0", textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : progress.length > 0 ? (
        <Table<ProgressRecord>
          rowKey="_id"
          columns={columns}
          dataSource={progress}
          pagination={{
            pageSize: 5,
          }}
        />
      ) : (
        <Empty description="No progress records yet" />
      )}
    </Modal>
  );
};
