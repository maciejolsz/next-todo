import { Suspense } from "react";

import { fetchTasks } from "@/app/lib/fetch-data";
import { TaskType } from "@/app/lib/types";
import Title from "@/app/ui/title";
import Events from "@/app/ui/workshop/pomodoro/events";
import PomodoroSettings from "@/app/ui/workshop/pomodoro/pomodoro-settings";
import { grabGoogleCreds } from "@/app/lib/helpers";

// todo: on click dim everything, display task name, details, timer and "play/pause/stop" button.
export default async function Page() {
  const {apiKey, clientId} = grabGoogleCreds();
  const tasks = await fetchTasks();
  const onItTasks: TaskType[] = tasks.filter(task => task.status === 'on-it');
  const themes = [
    {id: 1, name: "Hip-Hop"},
    {id: 2, name: "Piano"},
    {id: 3, name: "Jazz"},
  ];

  return <main>
    <Title text={"Pomodoro"} />
    <div className={"flex justify-between"}>
      <Suspense key={"onItTasks"} fallback={<div className={"main-content w-1/2"}>Loading...</div>}>
        <PomodoroSettings onItTasks={onItTasks} themes={themes}/>
      </Suspense>

      <div className={"main-content w-1/2"}>
        <Title text={"Coming events"} tier={"h3"}/>
        <Events apiKey={apiKey} clientId={clientId}/>
      </div>

    </div>
  </main>
}
