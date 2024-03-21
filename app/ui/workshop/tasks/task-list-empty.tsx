import { TaskStatusType } from "@/app/lib/types";
import TaskListHeader from "@/app/ui/workshop/tasks/task-list-header";
import {TbDragDrop} from "react-icons/tb";

type TaskListProps = { type: TaskStatusType, isOver: boolean, customRef: (element: HTMLElement | null) => void; }

export default function TaskListEmpty({ type, isOver, customRef }: TaskListProps) {
  const isOverClass = isOver ? "opacity-70 blur-sm" : undefined;

  return <div ref={customRef} className={`w-full h-full transition-all duration-100 ease-linear ${isOverClass}`}>
    <TaskListHeader type={type} />

    <TbDragDrop className={"block m-auto mt-28"} size={48} color={"rgb(209 213 219)"}/>
    <div className={"mt-4 text-center text-gray-300"}>Drop something HERE!</div>
  </div>
}
