import { Suspense } from "react";
import AddTask from "@/app/ui/workshop/tasks/add-task";
import Title from "@/app/ui/title";
import TasksManagerSkeleton from "@/app/ui/skeletons/tasks-manager";
import TasksManagerDnd from "@/app/ui/workshop/tasks/tasks-manager-dnd";
import {fetchTasks} from "@/app/lib/fetch-data";
import TasksManager from "@/app/ui/workshop/tasks/tasks-manager";

export default async function Page() {
  const tasks = await fetchTasks();
  return <main>
    <Title text={"Tasks"} />

    <div className={""}>
      <AddTask />
      <Suspense key={"tasks"} fallback={<TasksManagerSkeleton />}>
        <TasksManagerDnd tasks={tasks}/>
        {/* no dnd context below: */}
        {/* <TasksManager />*/}
      </Suspense>
    </div>
  </main>
}
