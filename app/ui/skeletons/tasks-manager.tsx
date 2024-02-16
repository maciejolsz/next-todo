import { Roboto_Slab } from "next/font/google";

import { taskTypes } from "@/app/ui/workshop/tasks/tasks-manager";
import { kebabToText } from "@/app/lib/helpers";
import styles from "@/app/ui/workshop/tasks/styles.module.css";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })


export default function TasksManagerSkeleton() {
  return <main>
    <div className={styles.tasksGrid}>
      {taskTypes.map((type) => {
        const doubleClass = ["new", "done"].includes(type) ? styles.doubleRow : "";
        const doneClass = type === "done" ? styles.doneCol : "";

        return <div key={type} className={`${styles.tasksSection} ${doubleClass} ${doneClass}`}>
          <div className={`w-full mb-2 text-lg capitalize ${robotoSlab.className}`}>
            { kebabToText(type) }
          </div>
          <div className={"h-12 my-4 bg-gray-100 animate-pulse"}></div>
          <div className={"h-12 my-4 bg-gray-100 animate-pulse"}></div>
          <div className={"h-12 my-4 bg-gray-100 animate-pulse"}></div>
        </div>
      })}
    </div>
  </main>;
}
