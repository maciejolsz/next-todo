import { TaskStatusType, TaskType } from "@/app/lib/types";
import TaskListEmpty from "@/app/ui/workshop/tasks/task-list-empty";
import TaskListFull from "@/app/ui/workshop/tasks/task-list-full";

export default function TaskList({ type, tasks }: { type: TaskStatusType, tasks: TaskType[] }) {
  if (tasks.length === 0) {
    return <TaskListEmpty type={type} />
  }

  return <TaskListFull type={type} tasks={tasks} />
}
