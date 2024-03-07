"use client"

import Title from "@/app/ui/title";
import {Button, FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";
import {TaskType} from "@/app/lib/types";
import Link from "next/link";

type PomodoroSettingsProps = {
  onItTasks: TaskType[];
  themes: {
    id: number;
    name: string;
  }[]
}

export default function PomodoroSettings({onItTasks, themes}: PomodoroSettingsProps) {
  const handleOnMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.match(/^[0-9]*$/)) {
      event.preventDefault();
    }
  }

  return <div className={"main-content w-1/2 mr-2 flex flex-col h-[500px] justify-between"}>
    <div><Title text={"Plan your session"} tier={"h3"}/></div>
    <div className={"m-auto w-1/2"}>
      {onItTasks.length > 0 &&
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
      }
      {onItTasks.length < 1 &&
        <Link href={"/workshop/tasks"}>
          <div className={"text-center border border-gray-300 hover:border-gray-500 py-4 rounded-s"}>
            Check yo tasks!
          </div>
        </Link>
      }
    </div>
    <div className={"m-auto w-1/2"}>
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
    <div className={"m-auto w-1/2"}>
      <FormControl fullWidth>
        <InputLabel id={"minutes"}>Minutes</InputLabel>
        <Input id={"minutes"} name={"minutes"} onChange={handleOnMinutesChange}
               inputProps={{min: 0, style: {textAlign: 'center'}}}/>
      </FormControl>
    </div>
    <div><Button fullWidth>Start</Button></div>
  </div>;
}
