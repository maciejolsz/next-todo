import { Suspense } from "react";
import TasksManager from "@/app/ui/workshop/tasks/tasks-manager";
import AddTask from "@/app/ui/workshop/tasks/add-task";
import Title from "@/app/ui/title";
import TasksManagerSkeleton from "@/app/ui/skeletons/tasks-manager";
export default function Page() {
  return <main>
    <Title text={"Tasks"} />

    <div className={""}>
      <AddTask />
      <Suspense key={"tasks"} fallback={<TasksManagerSkeleton />}>
        <TasksManager />
      </Suspense>
    </div>
  </main>
}
