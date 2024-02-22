import { fetchTasks } from "@/app/lib/fetch-data";
import { TaskStatusType, TaskType } from "@/app/lib/types";
import TaskList from "@/app/ui/workshop/tasks/task-list";

import styles from "./styles.module.css"

export const taskTypes: TaskStatusType[] = ["new", "next", "on-it", "project", "blocked", "done"];

export default async function TasksManager() {
  const tasks: TaskType[] = await fetchTasks();

  return <main>
      <div className={styles.tasksGrid}>
        {taskTypes.map((type) => {
          const doubleClass = ["new", "done"].includes(type) ? styles.doubleRow : "";
          const doneClass = type === "done" ? styles.doneCol : "";

          return <div key={type} className={`${styles.tasksSection} ${doubleClass} ${doneClass}`}>
            <TaskList type={type} tasks={tasks.filter((task) => task.status === type)}/>
          </div>
        })}
      </div>
  </main>
}
