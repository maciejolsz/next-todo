import { Suspense } from "react";
import TodoList from "@/app/ui/workshop/todos/todolist";
import AddToDo from "@/app/ui/workshop/todos/add-todo";
import Header from "@/app/ui/header";

export default function Page() {
  return <main>
    <Header text={"Your tasks"} />

    <div className={"main-content"}>
      <AddToDo />
      <Suspense key={"todos"} fallback={<div>Loading....</div>}>
        <TodoList/>
      </Suspense>
    </div>
  </main>
}
