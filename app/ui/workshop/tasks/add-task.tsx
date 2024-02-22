"use client"

import { useState } from "react";
import { useFormState } from 'react-dom';
import { BiAddToQueue } from "react-icons/bi";

import { Snackbar, Button } from '@mui/material';

import TaskModal from "@/app/ui/workshop/tasks/task-modal";
import { createTask } from "@/app/lib/form-actions";
import { HandleToggle } from "@/app/lib/types";
import { useHandleTaskFormModal } from "@/app/lib/hooks";


/**
 * A button that opens modal with new task form.
 * I'm not going to split this one since it's the only possible use case,
 * and it won't add any readability anyway.
 */
export default function AddTask() {
  const [status, setStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [createFormState, createFormAction] = useFormState(createTask, null);

  const createHandleToggle = (toggleFunction: (val: boolean) => void) => ({
    open: () => toggleFunction(true),
    close: () => toggleFunction(false)
  });

  const handleModalToggle: HandleToggle = createHandleToggle(setOpenModal);
  const handleSnackToggle: HandleToggle = createHandleToggle(setOpenSnack);

  // close modal, display snackbar based on form status. dependency: formState
  useHandleTaskFormModal({
    formState: createFormState,
    closeModal: handleModalToggle.close,
    openSnack: handleSnackToggle.open,
    setStatus
  });

  return (
    <>
      <div className={"mb-4 flex justify-start"}>
        <Button onClick={handleModalToggle.open}>
          <BiAddToQueue className={"inline pb-0 pr-1"} size={"24"} />
          Add task
        </Button>
        <div>
          <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleSnackToggle.close}
            message={status === "success" ? "SUCCESS" : "FAILURE"}
          />
        </div>
      </div>

      <TaskModal openModal={openModal} handleModalToggle={handleModalToggle} formAction={createFormAction} />
    </>
  )
}
