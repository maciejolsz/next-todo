import { Newsreader } from "next/font/google";
import {Suspense} from "react";
import TodoList from "@/app/ui/workshop/todos/todolist";

const newsreader = Newsreader({ subsets: ['latin'] })

export default function Page() {
  return <main>
    <h1 className={`text-[32px] text-center mb-8 ${newsreader.className}`}>Your tasks</h1>
    <Suspense key={"todos"} fallback={<div>Loading....</div>}>
      <TodoList />
    </Suspense>
  </main>
}
