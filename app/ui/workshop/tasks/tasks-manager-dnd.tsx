"use client"

import { useState, useOptimistic, startTransition } from "react";

import { DndContext, UniqueIdentifier } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core/dist/types";


import { TaskStatusType, TaskType } from "@/app/lib/types";
import TaskListSection from "@/app/ui/workshop/tasks/task-list-droppable";

import styles from "./styles.module.css"
import { changeTaskStatus } from "@/app/lib/form-actions";

export const taskTypes: TaskStatusType[] = ["new", "next", "on-it", "project", "blocked", "done"];

export default function TasksManagerDnd({tasks}: {tasks: TaskType[];}) {
  const [activeId, setActiveId] = useState<UniqueIdentifier>();

  const [optimisticTasks, moveOptimisticTask] = useOptimistic(
    tasks,
    (state: TaskType[], {newStatus, activeId}) => {
      state.map(task => {
        if (task.id === activeId) task.status = newStatus;
      });
      return [...state];
    }
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const newStatus = event.over?.id as TaskStatusType;
    if (activeId && event.over && taskTypes.includes(newStatus)) {
      startTransition(() => {moveOptimisticTask({newStatus, activeId})})
      changeTaskStatus(activeId, newStatus);
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  return <main>
      <div className={styles.tasksGrid}>
        <DndContext id={"uniqueId"} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          {taskTypes.map((type) => <TaskListSection key={type} type={type} tasks={optimisticTasks} />)}
        </DndContext>
      </div>
  </main>
}
