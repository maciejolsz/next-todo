import { fetchTasks } from "@/app/lib/fetch-data";
import { TaskType } from "@/app/lib/types";
import styles from "./styles.module.css"
import TaskList from "@/app/ui/workshop/tasks/task-list";

const taskTypes = ["new", "next", "on-it", "project", "blocked", "done"];

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
