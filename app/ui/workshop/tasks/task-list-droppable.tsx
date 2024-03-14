import styles from "@/app/ui/workshop/tasks/styles.module.css";
import TaskList from "@/app/ui/workshop/tasks/task-list";
import { TaskStatusType, TaskType } from "@/app/lib/types";

export default function TaskListSection({type, tasks}: {type: TaskStatusType, tasks: TaskType[]}) {
  const doubleClass = ["new", "done"].includes(type) ? styles.doubleRow : "";
  const doneClass = type === "done" ? styles.doneCol : "";
  const onItClass = type === "on-it" ? styles.onItClass : "";


  return <div key={type} className={`${styles.tasksSection} ${doubleClass} ${doneClass} ${onItClass}`}>
      <TaskList type={type} tasks={tasks.filter((task) => task.status === type)}/>
    </div>
}
