import { FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchTasks } from "@/app/lib/fetch-data";
import { TaskType } from "@/app/lib/types";

import Title from "@/app/ui/title";
import { grabGoogleCreds } from "@/app/workshop/pomodoro/actions";
import Events from "@/app/workshop/pomodoro/events";

// todo: select task, timer, theme, display coming meetings from both cals, add "start" button,
// on click dim everything, display task name, details, timer and "play/pause/stop" button.
export default async function Page() {
  const {apiKey, clientId} = grabGoogleCreds();
  const tasks = await fetchTasks();
  const onItTasks = tasks.filter(task => task.status === 'on-it');
  return <main>
    <Title text={"Pomodoro"} />
    <Events apiKey={apiKey} clientId={clientId}/>
    <div className={"main-content"}>
      <Title text={"Plan your session"} tier={"h3"} align={"left"} />
      <FormControl>
        <InputLabel id="task">Task</InputLabel>
        <Select labelId="task"
                id="task"
                name="task"
                label="Task"
                defaultValue={onItTasks[0].name}
                required>
          { onItTasks.map((task: TaskType) => {
            return <MenuItem key={task.id} value={task.name}>{task.name}</MenuItem>
          }) }
        </Select>
      </FormControl>
      <br />
      <br />
      <FormControl>
        <InputLabel id={"timer"}>Timer</InputLabel>
        <Input id={"timer"} name={"timer"} />
      </FormControl>
    </div>
  </main>
}
