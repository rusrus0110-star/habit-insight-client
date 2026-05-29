import { Button, Form, Input, Select, Space } from "antd";

import {
  HABIT_CATEGORY_OPTIONS,
  HABIT_DIFFICULTY_OPTIONS,
} from "../habit_options";
import type {
  CreateHabitPayload,
  Habit,
  UpdateHabitPayload,
} from "../habit_types";

type HabitFormValues = CreateHabitPayload | UpdateHabitPayload;

type HabitFormProps = {
  initialHabit?: Habit | null;
  isSubmitting: boolean;
  onSubmit: (values: HabitFormValues) => Promise<void>;
  onCancel: () => void;
};

export const HabitForm = ({
  initialHabit,
  isSubmitting,
  onSubmit,
  onCancel,
}: HabitFormProps) => {
  const [form] = Form.useForm<HabitFormValues>();

  return (
    <Form<HabitFormValues>
      form={form}
      layout="vertical"
      initialValues={{
        name: initialHabit?.name ?? "",
        category: initialHabit?.category ?? "health",
        difficulty: initialHabit?.difficulty ?? "easy",
      }}
      onFinish={onSubmit}
    >
      <Form.Item
        label="Habit name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter habit name.",
          },
          {
            min: 2,
            message: "Habit name must be at least 2 characters.",
          },
          {
            max: 100,
            message: "Habit name must not exceed 100 characters.",
          },
        ]}
      >
        <Input placeholder="Morning workout" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Please select category.",
          },
        ]}
      >
        <Select options={HABIT_CATEGORY_OPTIONS} />
      </Form.Item>

      <Form.Item
        label="Difficulty"
        name="difficulty"
        rules={[
          {
            required: true,
            message: "Please select difficulty.",
          },
        ]}
      >
        <Select options={HABIT_DIFFICULTY_OPTIONS} />
      </Form.Item>

      <Space style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onCancel}>Cancel</Button>

        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {initialHabit ? "Save changes" : "Create habit"}
        </Button>
      </Space>
    </Form>
  );
};
