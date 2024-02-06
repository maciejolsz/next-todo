"use client"

import { BiAddToQueue } from "react-icons/bi";
import { useState } from "react";
import {
  Box, Button, Modal, TextField,
  InputLabel, MenuItem, FormControl, Select
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Title from "@/app/ui/title";

export default function AddToDo() {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState('normal');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  return (
    <>
      <Button className={""} onClick={handleOpen}>
        <BiAddToQueue className={"inline pb-1"} size={"24"}/> Add task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"bg-white-rgb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 shadow-2xl p-4"}>
          <Title tier={"h2"} text={"Add new task:"} />
          <form>
            <TextField id="name" label="Task name" variant="outlined" className={"w-full my-2"}/>
            <TextField id="details" label="Details" multiline minRows={2} variant="outlined" className={"w-full my-2"}/>
            <Box className={"my-2"}>
              <FormControl fullWidth>
                <InputLabel id="priority">Priority</InputLabel>
                <Select
                  labelId="priority"
                  id="priority"
                  value={priority}
                  label="Priority"
                  onChange={handleChange}
                >
                  <MenuItem value={"low"}>Low</MenuItem>
                  <MenuItem value={"normal"}>Normal</MenuItem>
                  <MenuItem value={"high"}>High</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button type={"submit"} className={"w-full"}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

    </>
  )
}
