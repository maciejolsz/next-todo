import { Suspense } from "react";
import TaskList from "@/app/ui/workshop/tasks/tasklist";
import AddTask from "@/app/ui/workshop/tasks/add-task";
import Title from "@/app/ui/title";

export default function Page() {
  return <main>
    <Title text={"Tasks"} />

    <div className={"main-content"}>
      <AddTask />
      <Suspense key={"tasks"} fallback={<div>Loading....</div>}>
        <TaskList/>
      </Suspense>
    </div>
  </main>
}
