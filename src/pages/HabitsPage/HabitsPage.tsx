import { Button, Card, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const HabitsPage = () => {
  return (
    <div>
      <Title level={2}>Habits</Title>
      <Paragraph type="secondary">
        Create, edit, complete and track your habits.
      </Paragraph>

      <Card
        title="Habit list"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Create habit
          </Button>
        }
      >
        Coming soon
      </Card>
    </div>
  );
};
