import { TaskStatusType } from "@/app/lib/types";
import TaskListHeader from "@/app/ui/workshop/tasks/task-list-header";

type TaskListProps = { type: TaskStatusType, isOver: boolean, customRef: (element: HTMLElement | null) => void; }

export default function TaskListEmpty({ type, isOver, customRef }: TaskListProps) {
  const isOverClass = isOver ? "opacity-70 blur-sm" : undefined;

  return <div ref={customRef} className={`w-full h-full transition-all duration-100 ease-linear ${isOverClass}`}>
    <TaskListHeader type={type} />

    <div>Nothing here yet...</div>
  </div>
}
