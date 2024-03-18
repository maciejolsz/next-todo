"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";

import Title from "@/app/ui/title";
import { MusicThemeType, TaskType } from "@/app/lib/types";
import PomodoroModal from "@/app/ui/workshop/pomodoro/pomodoro-timer";

type PomodoroSettingsProps = {
  onItTasks: TaskType[];
  themes: MusicThemeType[]
}

const URL_PROTO = "http://";

// this component displays pomodoro session settings
// allows to start pomodoro session that shows PomodoroModal on click
// modal displays timer with task details and time remaining
export default function Pomodoro({onItTasks, themes}: PomodoroSettingsProps) {
  const DEFAULT_THEME = themes.find(theme => theme.name === "None") || themes[0];
  const [alarm, setAlarm] = useState<HTMLAudioElement>();
  const [openModal, setOpenModal] = useState(false);
  const [sessionMuted, setSessionMuted] = useState(false);
  const [sessionTime, setSessionTime] = useState<number>(25);
  const [selectedTheme, setSelectedTheme] = useState<MusicThemeType>(DEFAULT_THEME);
  const [audioSelected, setAudioSelected] = useState<HTMLAudioElement>();
  const [selectedTask, setSelectedTask] = useState<TaskType>(onItTasks[0]);

  const handleOnStart = () => {
    audioSelected?.play()
                  .catch(() => setAudioSelected(undefined));
    setSessionMuted(false);
    setOpenModal(true);
  }

  const handleOnCloseModal = () => {
    audioSelected?.pause();
    setOpenModal(false);
    setSessionMuted(true);
  }

  const handleSessionToggle = () => {
    if (sessionMuted) {
      audioSelected?.play()
                    .catch(() => setAudioSelected(undefined));
      setSessionMuted(false);
    }
    if (!sessionMuted) {
      setSessionMuted(true);
      audioSelected?.pause();
    }
  }

  const handleOnMinutesChange = (event: any) => {
    setSessionTime(parseInt(event.target.value));
  }

  const handleThemeChange = (themeName: string) => {
    const theme = themes.find(theme => theme.name === themeName);
    audioSelected?.pause();

    if (!theme) return;

    const audioFile = prepareAudio(theme);

    if (!audioFile?.src) return setAudioSelected(undefined);

    setAudioSelected(audioFile);
    setSelectedTheme(theme);
  }

  const handleTaskChange = (event: any) => {
    const task = onItTasks.find(task => task.id === event.target.value);
    if (task) setSelectedTask(task);
  }

  useEffect(() => {
    setAlarm(new Audio("/alarm.mp3"));
    // initial load of hip hop track
    setAudioSelected(prepareAudio(DEFAULT_THEME));
  }, []);

  function prepareAudio(theme: MusicThemeType) {
    if (!theme.url) return;
    const audioFile = new Audio(URL_PROTO + theme.url)
    audioFile.loop = true;
    return audioFile;
  }

  return <div className={"main-content w-1/2 mr-2 flex flex-col h-[500px] justify-between"}>
    <div><Title tier={"h3"}>Plan your session</Title></div>
    <div className={"m-auto w-1/2"}>
      {onItTasks.length > 0 &&
        <FormControl fullWidth>
          <InputLabel id="task-label">Task</InputLabel>
          <Select labelId="task-label"
                  id="task"
                  label="Task"
                  value={onItTasks[0].id}
                  onChange={(e) => handleTaskChange(e.target.value)}
                  required>
            {onItTasks.map((task: TaskType) => {
              return <MenuItem key={task.id} value={task.id}>{task.name}</MenuItem>
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
                value={selectedTheme.name}
                onChange={(e) => handleThemeChange(e.target.value)}
                required>
          {themes.map((theme: MusicThemeType) => {
            return <MenuItem key={theme.id} value={theme.name}>{theme.name}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
    <div className={"m-auto w-1/2"}>
        <ToggleButtonGroup
          color="primary"
          value={sessionTime}
          fullWidth
          exclusive
          onChange={(e) => handleOnMinutesChange(e)}
          aria-label="Minutes"
        >
          <ToggleButton value={1}>1:00</ToggleButton>
          <ToggleButton value={5}>5:00</ToggleButton>
          <ToggleButton value={15}>15:00</ToggleButton>
          <ToggleButton value={25}>25:00</ToggleButton>
        </ToggleButtonGroup>
    </div>
    <div className={"m-auto w-1/2"}>
      <Button fullWidth
              onClick={handleOnStart}>
        Start
      </Button>
    </div>

    { alarm && <PomodoroModal openModal={openModal} onClose={handleOnCloseModal} onToggle={handleSessionToggle}
                    muteDisabled={!audioSelected} sessionMuted={sessionMuted}
                    alarm={alarm}
                    selectedTask={selectedTask}
                    sessionTime={sessionTime}/> }
  </div>
}
