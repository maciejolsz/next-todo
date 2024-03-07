import { Suspense } from "react";

import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";

import { fetchTasks } from "@/app/lib/fetch-data";
import { TaskType } from "@/app/lib/types";
import Title from "@/app/ui/title";
import { grabGoogleCreds } from "@/app/workshop/pomodoro/actions";
import Events from "@/app/workshop/pomodoro/events";

// todo: on click dim everything, display task name, details, timer and "play/pause/stop" button.
export default async function Page() {
  const {apiKey, clientId} = grabGoogleCreds();
  const tasks = await fetchTasks();
  const onItTasks = tasks.filter(task => task.status === 'on-it');
  const themes = [
    {id: 1, name: "Hip-Hop"},
    {id: 2, name: "Piano"},
    {id: 3, name: "Jazz"},
  ];

  return <main>
    <Title text={"Pomodoro"} />
    <div className={"flex justify-between"}>
      <Suspense key={"onItTasks"} fallback={<div className={"main-content w-1/2"}>Loading...</div>}>
        <div className={"main-content w-1/2 mr-2 flex flex-col h-[500px] justify-between"}>
          <div><Title text={"Plan your session"} tier={"h3"}/></div>
          <div className={"m-auto w-1/4"}>
            <FormControl fullWidth>
              <InputLabel id="task-label">Task</InputLabel>
              <Select labelId="task-label"
                      id="task"
                      label="Task"
                      defaultValue={onItTasks[0].name}
                      required>
                {onItTasks.map((task: TaskType) => {
                  return <MenuItem key={task.id} value={task.name}>{task.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>
          <div className={"m-auto w-1/4"}>
            <FormControl fullWidth>
              <InputLabel id="theme-label">Theme</InputLabel>
              <Select labelId="theme-label"
                      id="theme"
                      label="Theme"
                      defaultValue={themes[0].name}
                      required>
                {themes.map((theme: { id: number, name: string }) => {
                  return <MenuItem key={theme.id} value={theme.name}>{theme.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>
          <div className={"m-auto w-1/4"}>
            <FormControl>
              <InputLabel id={"minutes"}>Minutes</InputLabel>
              <Input id={"minutes"} name={"minutes"} type={"number"}
                     inputProps={{min: 0, style: { textAlign: 'center' }}}/>
            </FormControl>
          </div>
          <div><Button fullWidth>Start</Button></div>
        </div>
      </Suspense>

      <div className={"main-content w-1/2"}>
        <Title text={"Coming events"} tier={"h3"}/>
        <Events apiKey={apiKey} clientId={clientId}/>
      </div>

    </div>
  </main>
}
