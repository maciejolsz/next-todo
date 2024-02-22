"use client"
import {TaskStatusType, TaskType} from "@/app/lib/types";

import styles from "./styles.module.css"

import TaskListSection from "@/app/ui/workshop/tasks/task-list-droppable";
import {DndContext, DragOverlay, UniqueIdentifier} from "@dnd-kit/core";
import {useState} from "react";
import type {DragEndEvent, DragStartEvent} from "@dnd-kit/core/dist/types";

export const taskTypes: TaskStatusType[] = ["new", "next", "on-it", "project", "blocked", "done"];

export default function TasksManagerDnd({tasks}: {tasks: TaskType[]}) {
  const [isDropped, setIsDropped] = useState(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier>();

  const handleDragEnd = (event: DragEndEvent) => {
    alert('end 1')
    if (event.over && taskTypes.includes(event.over.id as TaskStatusType)) {
      alert('end 2')
      setIsDropped(true);
    }
  }
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  return <main>
      <div className={styles.tasksGrid}>
        <DndContext id={"uniqueId"} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          {taskTypes.map((type) => <TaskListSection key={type} type={type} tasks={tasks} />)}

        </DndContext>
      </div>
  </main>
}
