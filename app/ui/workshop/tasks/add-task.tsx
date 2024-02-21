"use client"

import { useEffect, useState } from "react";
import { useFormState } from 'react-dom';
import { BiAddToQueue } from "react-icons/bi";

import {
  Box, Button, Modal, TextField,
  InputLabel, MenuItem, FormControl, Select, Snackbar
} from '@mui/material';

import Title from "@/app/ui/title";
import { createTask } from "@/app/lib/form-actions";
import SubmitButton from "@/app/ui/workshop/submit-button";

/**
 * A button that opens modal with new task form.
 * I'm not going to split this one since it's the only possible use case,
 * and it won't add any readability anyway.
 */
export default function AddTask() {
  const [openModal, setOpenModal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [status, setStatus] = useState("");
  const [formState, formAction] = useFormState(createTask, null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenSnack = () => setOpenSnack(true);
  const handleCloseSnack = () => setOpenSnack(false);

  useEffect(() => {
    if (!formState?.type) return;
    handleCloseModal();
    setStatus(formState.type);
    handleOpenSnack();
  }, [formState]);

  return (
    <>
      <div className={"mb-4 flex justify-start"}>
        <Button onClick={handleOpenModal}>
          <BiAddToQueue className={"inline pb-0 pr-1"} size={"24"}/> Add task
        </Button>
        <div>
          <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
            message={status === "success" ? "SUCCESS" : "FAILURE"}
          />
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"bg-white-rgb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 shadow-2xl p-4"}>
          <Title tier={"h2"} text={"New task:"} />
          <form action={formAction}>
            <TextField id="name" name="name" label="Task name"
                       variant="outlined" sx={{my: 1, width: "100%"}}
                       required />
            <TextField id="details" name="details" label="Details"
                       multiline minRows={2} variant="outlined" sx={{my: 1, width: "100%"}}
                       required />
            <Box sx={{my: 1, width: "100%"}}>
              <FormControl fullWidth>
                <InputLabel id="priority">Priority</InputLabel>
                <Select labelId="priority" id="priority" name="priority"
                        defaultValue={"normal"} label="Priority"
                        required
                >
                  <MenuItem value={"low"}>Low</MenuItem>
                  <MenuItem value={"normal"}>Normal</MenuItem>
                  <MenuItem value={"high"}>High</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <SubmitButton size={"full"}/>
          </form>
        </Box>
      </Modal>
    </>
  )
}
