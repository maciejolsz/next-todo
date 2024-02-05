import {fetchTodos} from "@/app/lib/data";
import {TodoType} from "@/app/lib/types";

export default async function TodoList() {
  const todos: TodoType[] = await fetchTodos();
  return todos.map(todo => {
    return (<>
      <div className={"border-b-2 border-gray-500 pb-4 mb-4"}>
        <div>
          <span className={"font-normal"}>{todo.name}</span> (<span
          className={"text-gray-700 font-light text-sm"}>{todo.status}</span>)
        </div>
        <div className={"text-gray-700 text-sm font-light"}>{todo.details}</div>
      </div>
    </>)
  })
}
