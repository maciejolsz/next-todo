import { Suspense } from "react";

import { fetchTasks } from "@/app/lib/fetch-data";
import { TaskType } from "@/app/lib/types";
import Title from "@/app/ui/title";
import Events from "@/app/ui/workshop/pomodoro/events";
import Pomodoro from "@/app/ui/workshop/pomodoro/pomodoro";
import { grabGoogleCreds } from "@/app/lib/helpers";

export default async function Page() {
  const calendarIds = [process.env.CALENDAR_ID0 || "", process.env.CALENDAR_ID1 || ""]
  const {apiKey, clientId} = grabGoogleCreds();
  const onItTasks: TaskType[] = await fetchTasks().then((tasks) => {
    return tasks.filter(task => task.status === 'on-it');
  });

  const themes = [
    {id: 1, name: "None"},
    {id: 2, name: "Hip-Hop"},
    {id: 3, name: "Jazz"},
  ];

  return <main>
    <Title>Pomodoro</Title>
    <div className={"flex justify-between"}>
      <Suspense key={"onItTasks"} fallback={<div className={"main-content w-1/2"}>Loading...</div>}>
        <Pomodoro onItTasks={onItTasks} themes={themes}/>
      </Suspense>

      <div className={"main-content w-1/2"}>
        <Title tier={"h3"}>Coming events</Title>
        <Events apiKey={apiKey} clientId={clientId} calendarIds={calendarIds}/>
      </div>
    </div>
  </main>
}
