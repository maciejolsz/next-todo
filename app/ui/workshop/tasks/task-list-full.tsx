"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";

import { Menu, MenuItem, Snackbar} from "@mui/material";

import TaskModal from "@/app/ui/workshop/tasks/task-modal";
import { HandleToggle, TaskStatusType, TaskType } from "@/app/lib/types";
import { deleteTask, editTask } from "@/app/lib/form-actions";
import { useHandleTaskFormModal } from "@/app/lib/hooks";
import TaskDraggable from "@/app/ui/workshop/tasks/task-draggable";
import TaskListHeader from "@/app/ui/workshop/tasks/task-list-header";

type TaskListProps = {
  type: TaskStatusType;
  tasks: TaskType[];
  isOver: boolean;
  customRef: (element: HTMLElement | null) => void;
}

export default function TaskListFull({ type, tasks, isOver, customRef }: TaskListProps) {
  const t = useTranslations();

  const isOverClass = isOver ? "opacity-50 blur-sm" : undefined;
  // contains recently updated formState - edit/delete
  const [status, setStatus] = useState("");
  // set on task options click, stores task data
  const [selectedTask, setSelectedTask] = useState<TaskType>(tasks[0]);

  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | EventTarget & SVGElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const deleteTaskWithId = deleteTask.bind(null, selectedTask.id!);
  const [deleteFormState, deleteFormAction] = useFormState(deleteTaskWithId, null);
  const editTaskWithId = editTask.bind(null, selectedTask.id!);
  const [editFormState, editFormAction] = useFormState(editTaskWithId, null);

  // closure used for open/close modal, snack and menu
  const createHandleToggle = (toggleFunction: (val: boolean) => void) => ({
    open: () => toggleFunction(true),
    close: () => toggleFunction(false)
  });

  const handleModalToggle: HandleToggle = createHandleToggle(setOpenModal);
  const handleSnackToggle: HandleToggle = createHandleToggle(setOpenSnack);
  const handleMenuToggle: HandleToggle = createHandleToggle(setOpenMenu);

  // close modal, display snackbar based on form status. dependency: formState
  const commonFormProps = {
    closeModal: handleModalToggle.close,
    openSnack: handleSnackToggle.open,
    setStatus
  };

  useHandleTaskFormModal({formState: editFormState, ...commonFormProps});
  useHandleTaskFormModal({formState: deleteFormState, ...commonFormProps});

  return <div ref={customRef} className={`w-full h-full transition-all duration-100 ease-linear ${isOverClass}`}>
    <TaskListHeader type={type} />

    <ul>
      {tasks.map((task) => {
        return <TaskDraggable task={task} key={task.id}
                     setSelectedTask={setSelectedTask}
                     setAnchorEl={setAnchorEl}
                     openMenu={handleMenuToggle.open} />
      })}
    </ul>

    <TaskModal selectedTask={selectedTask}
               openModal={openModal}
               handleModalToggle={handleModalToggle}
               formAction={editFormAction} />

    <div>
      <Snackbar open={openSnack}
                autoHideDuration={6000}
                onClose={handleSnackToggle.close}
                message={status === "success" ? "SUCCESS" : "FAILURE"}/>
    </div>

    <Menu id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuToggle.close}>
      <MenuItem onClick={() => {
        handleModalToggle.open();
        handleMenuToggle.close();
      }}>
        {t("tasks.menu.edit")}
      </MenuItem>
      <MenuItem onClick={handleMenuToggle.close}>
        <form action={deleteFormAction}>
          <button>{t("tasks.menu.delete")}</button>
        </form>
      </MenuItem>
    </Menu>
  </div>
}
