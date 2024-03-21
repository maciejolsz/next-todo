import { Box, Button, Modal } from "@mui/material";

import Title from "@/app/ui/title";
import Timer from "@/app/components/timer";
import { TaskType } from "@/app/lib/types";
import {useTranslations} from "next-intl";

type PomodoroTimerProps = {
  openModal: boolean;
  onClose: () => void;
  onToggle: () => void;
  selectedTask: TaskType;
  sessionTime: number;
  muteDisabled: boolean;
  sessionMuted: boolean;
  alarm: HTMLAudioElement;
}
export default function PomodoroModal({openModal, onClose, onToggle, selectedTask, sessionTime, muteDisabled, sessionMuted, alarm}: PomodoroTimerProps) {
  const t = useTranslations("pomodoro.session");

  return <Modal
    open={openModal}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className={"bg-white-rgb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 shadow-2xl p-4"}>
      <Title tier={"h3"}>{selectedTask ? selectedTask.name : t("defaultTitle")}</Title>
      <p className={"text-center"}>{selectedTask ? selectedTask.details : t("defaultDetails")}</p>
      <Timer minutes={sessionTime} alarm={alarm} />
      <Button type={"submit"}
              color={"primary"}
              fullWidth
              onClick={onToggle}
              disabled={muteDisabled}
      >
        { sessionMuted ? t("unmute") : t("mute") }
      </Button>
    </Box>
  </Modal>;
}
