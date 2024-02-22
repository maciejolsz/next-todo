"use client"

import { useDroppable } from "@dnd-kit/core";

import { TaskStatusType, TaskType } from "@/app/lib/types";
import TaskListEmpty from "@/app/ui/workshop/tasks/task-list-empty";
import TaskListFull from "@/app/ui/workshop/tasks/task-list-full";

export default function TaskList({ type, tasks }: { type: TaskStatusType, tasks: TaskType[] }) {
  const {isOver, setNodeRef} = useDroppable({
    id: type,
  });

  if (tasks.length === 0) {
    return <TaskListEmpty type={type} customRef={setNodeRef} isOver={isOver} />
  }

  return <TaskListFull type={type} tasks={tasks} customRef={setNodeRef} isOver={isOver} />
}
