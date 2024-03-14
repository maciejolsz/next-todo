"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";

import Title from "@/app/ui/title";
import { TaskType } from "@/app/lib/types";
import Timer from "@/app/components/timer";

type PomodoroSettingsProps = {
  onItTasks: TaskType[];
  themes: {
    id: number;
    name: string;
  }[]
}

const musicMap = [
  { type: "None", fileName: "" },
  { type: "Hip-Hop", fileName: "/music-themes/lofihiphop.mp3" },
  { type: "Jazz", fileName: "/music-themes/lofijazz.mp3" },
];
const DEFAULT_THEME = "None";

export default function Pomodoro({onItTasks, themes}: PomodoroSettingsProps) {
  const [openModal, setOpenModal] = useState(false);
  const [sessionMuted, setSessionMuted] = useState(false);
  const [sessionTime, setSessionTime] = useState<number>(25);
  const [myTheme, setMyTheme] = useState<string>(DEFAULT_THEME);
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

  const handleThemeChange = (theme: string) => {
    audioSelected?.pause();
    const audioFile = prepareAudio(theme);

    if (!audioFile.src) return setAudioSelected(undefined);

    setAudioSelected(audioFile);
    setMyTheme(theme);
  }

  const handleTaskChange = (event: any) => {
    const task = onItTasks.find(task => task.id === event.target.value);
    if (task) setSelectedTask(task);
  }

  useEffect(() => {
    // initial load of hip hop track
    setAudioSelected(prepareAudio(DEFAULT_THEME));
  }, []);

  function prepareAudio(theme: string) {
    const audioFile = new Audio(musicMap.find(music => music.type === theme)?.fileName.toString())
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
                value={myTheme}
                onChange={(e) => handleThemeChange(e.target.value)}
                required>
          {themes.map((theme: { id: number, name: string }) => {
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

    <Modal
      open={openModal}
      onClose={handleOnCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={"bg-white-rgb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 shadow-2xl p-4"}>
        <Title tier={"h3"}>{selectedTask.name}</Title>
        <p className={"text-center"}>{selectedTask.details}</p>
        <Timer minutes={sessionTime} />
        <Button type={"submit"}
                color={"primary"}
                fullWidth
                onClick={handleSessionToggle}
                disabled={!audioSelected}
        >
          { sessionMuted ? "Unmute" : "Mute" }
        </Button>
      </Box>
    </Modal>
  </div>
}
