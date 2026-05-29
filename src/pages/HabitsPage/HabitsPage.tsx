import { useCallback, useEffect, useMemo, useState } from "react";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Card,
  Col,
  Empty,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";

import { habitsApi } from "../../api/habits_api";
import { progressApi } from "../../api/progress_api";
import { HabitCard } from "../../features/habits/components/HabitCard";
import { HabitCompleteModal } from "../../features/habits/components/HabitCompleteModal";
import { HabitForm } from "../../features/habits/components/HabitForm";
import { HabitProgressModal } from "../../features/habits/components/HabitProgressModal";
import {
  HABIT_CATEGORY_OPTIONS,
  HABIT_DIFFICULTY_OPTIONS,
} from "../../features/habits/habit_options";
import type {
  CompleteHabitPayload,
  CreateHabitPayload,
  Habit,
  HabitCategory,
  HabitDifficulty,
  ProgressRecord,
  UpdateHabitPayload,
} from "../../features/habits/habit_types";
import styles from "./HabitsPage.module.css";

const { Title, Paragraph } = Typography;

type HabitFormMode = "create" | "edit";

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

export const HabitsPage = () => {
  const { notification } = App.useApp();

  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [categoryFilter, setCategoryFilter] = useState<HabitCategory | "all">(
    "all",
  );
  const [difficultyFilter, setDifficultyFilter] = useState<
    HabitDifficulty | "all"
  >("all");

  const [formMode, setFormMode] = useState<HabitFormMode>("create");
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const [isCompleteModalOpen, setIsCompleteModalOpen] =
    useState<boolean>(false);

  const [isProgressModalOpen, setIsProgressModalOpen] =
    useState<boolean>(false);
  const [isProgressLoading, setIsProgressLoading] = useState<boolean>(false);
  const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>([]);

  const fetchHabits = useCallback(
    async (showLoader = true) => {
      if (showLoader) {
        setIsLoading(true);
      }

      try {
        const habitsData = await habitsApi.getHabits();
        setHabits(habitsData);
      } catch (error) {
        notification.error({
          message: "Failed to load habits",
          description: getErrorMessage(error),
        });
      } finally {
        setIsLoading(false);
      }
    },
    [notification],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchHabits(false);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [fetchHabits]);

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesCategory =
        categoryFilter === "all" || habit.category === categoryFilter;

      const matchesDifficulty =
        difficultyFilter === "all" || habit.difficulty === difficultyFilter;

      return matchesCategory && matchesDifficulty;
    });
  }, [habits, categoryFilter, difficultyFilter]);

  const openCreateModal = () => {
    setFormMode("create");
    setSelectedHabit(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (habit: Habit) => {
    setFormMode("edit");
    setSelectedHabit(habit);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedHabit(null);
    setFormMode("create");
  };

  const handleHabitFormSubmit = async (
    values: CreateHabitPayload | UpdateHabitPayload,
  ) => {
    setIsSubmitting(true);

    try {
      if (formMode === "create") {
        await habitsApi.createHabit(values as CreateHabitPayload);

        notification.success({
          message: "Habit created",
          description: "New habit has been created successfully.",
        });
      }

      if (formMode === "edit" && selectedHabit) {
        await habitsApi.updateHabit(
          selectedHabit._id,
          values as UpdateHabitPayload,
        );

        notification.success({
          message: "Habit updated",
          description: "Habit has been updated successfully.",
        });
      }

      closeFormModal();
      await fetchHabits(false);
    } catch (error) {
      notification.error({
        message: formMode === "create" ? "Create failed" : "Update failed",
        description: getErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteHabit = async (habit: Habit) => {
    setIsSubmitting(true);

    try {
      await habitsApi.deleteHabit(habit._id);

      notification.success({
        message: "Habit deleted",
        description: `${habit.name} has been deleted.`,
      });

      await fetchHabits(false);
    } catch (error) {
      notification.error({
        message: "Delete failed",
        description: getErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCompleteModal = (habit: Habit) => {
    setSelectedHabit(habit);
    setIsCompleteModalOpen(true);
  };

  const closeCompleteModal = () => {
    setIsCompleteModalOpen(false);
    setSelectedHabit(null);
  };

  const handleCompleteHabit = async (values: CompleteHabitPayload) => {
    if (!selectedHabit) {
      return;
    }

    setIsSubmitting(true);

    try {
      await habitsApi.completeHabit(selectedHabit._id, values);

      notification.success({
        message: "Habit completed",
        description: `${selectedHabit.name} has been completed today.`,
      });

      closeCompleteModal();
      await fetchHabits(false);
    } catch (error) {
      notification.error({
        message: "Completion failed",
        description: getErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openProgressModal = async (habit: Habit) => {
    setSelectedHabit(habit);
    setIsProgressModalOpen(true);
    setIsProgressLoading(true);

    try {
      const result = await progressApi.getHabitProgressHistory(habit._id, 30);
      setProgressRecords(result.progress);
    } catch (error) {
      notification.error({
        message: "Failed to load progress history",
        description: getErrorMessage(error),
      });
    } finally {
      setIsProgressLoading(false);
    }
  };

  const closeProgressModal = () => {
    setIsProgressModalOpen(false);
    setSelectedHabit(null);
    setProgressRecords([]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <Title level={2}>Habits</Title>
          <Paragraph type="secondary">
            Create, edit, complete and track your habits. Each completion
            updates streaks, total completions and progress history.
          </Paragraph>
        </div>

        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => void fetchHabits(true)}
          >
            Refresh
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Create habit
          </Button>
        </Space>
      </div>

      <Card className={styles.filters}>
        <Space wrap>
          <Select
            style={{ width: 180 }}
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={[
              {
                label: "All categories",
                value: "all",
              },
              ...HABIT_CATEGORY_OPTIONS,
            ]}
          />

          <Select
            style={{ width: 180 }}
            value={difficultyFilter}
            onChange={setDifficultyFilter}
            options={[
              {
                label: "All difficulties",
                value: "all",
              },
              ...HABIT_DIFFICULTY_OPTIONS,
            ]}
          />
        </Space>
      </Card>

      {isLoading ? (
        <div style={{ padding: "64px 0", textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : filteredHabits.length > 0 ? (
        <Row gutter={[16, 16]} className={styles.cardGrid}>
          {filteredHabits.map((habit) => (
            <Col xs={24} xl={12} key={habit._id}>
              <HabitCard
                habit={habit}
                onEdit={openEditModal}
                onDelete={handleDeleteHabit}
                onComplete={openCompleteModal}
                onShowHistory={openProgressModal}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Empty
            className={styles.emptyState}
            description={
              habits.length === 0
                ? "No habits yet. Create your first habit."
                : "No habits match selected filters."
            }
          >
            {habits.length === 0 && (
              <Button type="primary" onClick={openCreateModal}>
                Create habit
              </Button>
            )}
          </Empty>
        </Card>
      )}

      <Modal
        title={formMode === "create" ? "Create habit" : "Edit habit"}
        open={isFormModalOpen}
        footer={null}
        onCancel={closeFormModal}
        destroyOnHidden
      >
        <HabitForm
          initialHabit={selectedHabit}
          isSubmitting={isSubmitting}
          onSubmit={handleHabitFormSubmit}
          onCancel={closeFormModal}
        />
      </Modal>

      <HabitCompleteModal
        habit={selectedHabit}
        open={isCompleteModalOpen}
        isSubmitting={isSubmitting}
        onCancel={closeCompleteModal}
        onSubmit={handleCompleteHabit}
      />

      <HabitProgressModal
        habit={selectedHabit}
        open={isProgressModalOpen}
        isLoading={isProgressLoading}
        progress={progressRecords}
        onCancel={closeProgressModal}
      />
    </div>
  );
};
