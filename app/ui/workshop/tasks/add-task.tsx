"use client"

import { useEffect, useState } from "react";
import { useFormState } from 'react-dom';
import { BiAddToQueue, BiCheck, BiDizzy } from "react-icons/bi";

import {
  Box, Button, Modal, TextField,
  InputLabel, MenuItem, FormControl, Select, Alert
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import Title from "@/app/ui/title";
import createTask from "@/app/lib/form-actions";
import SubmitButton from "@/app/ui/workshop/submit-button";

/**
 * A button that opens modal with new task form.
 * I'm not going to split this one since it's the only possible use case,
 * and it won't add any readability anyway.
 */
export default function AddTask() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState('normal');
  const [formState, formAction] = useFormState(createTask, null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  useEffect(() => {
    if (!formState?.type) return;
    handleClose();
    setStatus(formState.type);
  }, [formState]);

  return (
    <>
      <div className={"mb-4 flex justify-start"}>
        <Button onClick={handleOpen}>
          <BiAddToQueue className={"inline pb-0 pr-1"} size={"24"}/> Add task
        </Button>
        { status === "success" &&
          <Alert onClose={() => {setStatus("")}} icon={<BiCheck size={24}/>} severity="success" className={"py-0 ml-6 flex-grow"}>
            Here is a gentle confirmation that your action was successful.
          </Alert>
        }
        { status === "error" &&
          <Alert onClose={() => {setStatus("")}} icon={<BiDizzy size={24}/>} severity="error" className={"py-0 ml-6 flex-grow"}>
              Here is a gentle confirmation that your action was a fucking failure.
          </Alert>
        }
      </div>

      <Modal
        open={open}
        onClose={handleClose}
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
                        value={priority} label="Priority"
                        onChange={handleChange}
                        required
                >
                  <MenuItem value={"low"}>Low</MenuItem>
                  <MenuItem value={"normal"}>Normal</MenuItem>
                  <MenuItem value={"high"}>High</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <SubmitButton />
          </form>
        </Box>
      </Modal>
    </>
  )
}