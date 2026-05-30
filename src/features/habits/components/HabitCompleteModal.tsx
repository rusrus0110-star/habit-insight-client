import { Form, Input, Modal, Select } from "antd";

import { MOOD_OPTIONS } from "../habit_options";
import type { CompleteHabitPayload, Habit } from "../habit_types";

const { TextArea } = Input;

type HabitCompleteModalProps = {
  habit: Habit | null;
  open: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: CompleteHabitPayload) => Promise<void>;
};

export const HabitCompleteModal = ({
  habit,
  open,
  isSubmitting,
  onCancel,
  onSubmit,
}: HabitCompleteModalProps) => {
  const [form] = Form.useForm<CompleteHabitPayload>();

  const handleOk = async () => {
    const values = await form.validateFields();

    await onSubmit({
      mood: Number(values.mood),
      notes: values.notes?.trim() || "",
    });

    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={habit ? `Complete: ${habit.name}` : "Complete habit"}
      open={open}
      okText="Complete"
      confirmLoading={isSubmitting}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnHidden
    >
      <Form<CompleteHabitPayload>
        form={form}
        layout="vertical"
        initialValues={{
          mood: 5,
          notes: "",
        }}
      >
        <Form.Item
          label="Mood"
          name="mood"
          rules={[
            {
              required: true,
              message: "Please select your mood.",
            },
          ]}
        >
          <Select options={MOOD_OPTIONS} />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <TextArea
            rows={4}
            maxLength={500}
            showCount
            placeholder="Optional note about today's progress"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
