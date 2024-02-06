import { Suspense } from "react";
import TodoList from "@/app/ui/workshop/todos/todolist";
import AddToDo from "@/app/ui/workshop/todos/add-todo";
import Title from "@/app/ui/title";

export default function Page() {
  return <main>
    <Title text={"Manage your tasks."} />

    <div className={"main-content"}>
      <AddToDo />
      <Suspense key={"todos"} fallback={<div>Loading....</div>}>
        <TodoList/>
      </Suspense>
    </div>
  </main>
}
