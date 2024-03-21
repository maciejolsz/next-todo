import styles from "@/app/ui/workshop/tasks/styles.module.css";
import TaskList from "@/app/ui/workshop/tasks/task-list";
import { TaskStatusType, TaskType } from "@/app/lib/types";

type TaskListSectionProps = { type: TaskStatusType; tasks: TaskType[]; }

export default function TaskListSection({type, tasks}: TaskListSectionProps) {
  const doubleRowSections = ["next"];
  const doubleColSections = ["on-it"];

  const doubleRowClass = doubleRowSections.includes(type) ? styles.doubleRow : "";
  const doubleColClass = doubleColSections.includes(type) ? styles.doubleCol : "";

  const onItClass = type === "on-it" ? styles.onItClass : "";
  const nextClass = type === "next" ? styles.nextClass : "";

  return <div key={type} className={`${styles.tasksSection} ${doubleColClass} ${onItClass} ${nextClass} ${doubleRowClass}`}>
        <TaskList type={type} tasks={tasks.filter((task) => task.status === type)} />
    </div>
}
