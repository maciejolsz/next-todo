import { fetchTasks } from "@/app/lib/fetch-data";
import {TaskType} from "@/app/lib/types";

export default async function TaskList() {
  const tasks: TaskType[] = await fetchTasks();
  return tasks.map(task => {
    return (<>
      <div className={"border-b-2 border-gray-500 pb-4 mb-4"}>
        <div>
          <span className={"font-normal"}>{task.name}</span> (<span
          className={"text-gray-700 font-light text-sm"}>{task.status}</span>)
        </div>
        <div className={"text-gray-700 text-sm font-light"}>{task.details}</div>
      </div>
    </>)
  })
}
