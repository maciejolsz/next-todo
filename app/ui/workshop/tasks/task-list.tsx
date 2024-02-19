"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { Roboto_Slab } from "next/font/google";
import {BiSolidChevronDown, BiEditAlt} from "react-icons/bi";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import { TaskType } from "@/app/lib/types";
import { kebabToText } from "@/app/lib/helpers";
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField} from "@mui/material";
import Title from "@/app/ui/title";
import SubmitButton from "@/app/ui/workshop/submit-button";
import { editTask } from "@/app/lib/form-actions";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export default function TaskList({ type, tasks }: { type: string, tasks: TaskType[] }) {
  if (tasks.length === 0) {
    return <>
      <div className={`w-full mb-2 text-lg capitalize ${robotoSlab.className}`}>
        {kebabToText(type)}
      </div>

      <div>-</div>
    </>
  }

  const [open, setOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<TaskType>(tasks[0]);

  const editTaskWithId = editTask.bind(null, editedTask.id);
  const [, formAction] = useFormState(editTaskWithId, null);

  const handleEdit = (task: TaskType) => {
    setEditedTask(task);
    handleOpen();
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // set some different themes for different priorioties
  const prioTheme = (task: TaskType) => {
    if (task.priority === "high") return {backgroundColor: "#ffcccc"};
    if (task.priority === "low") return {backgroundColor: "rgb(244, 244, 244)", color: "rgb(144, 144, 144)"};
    return {backgroundColor: "rgb(244, 244, 244)"};
  }

  return <>
    <div className={`w-full mb-2 text-lg capitalize ${robotoSlab.className}`}>
      {kebabToText(type)}
    </div>

    <ul>
      {tasks.map((task) => {
        return <div key={task.id} className={"my-4"}>
          <Accordion elevation={2} disableGutters={true}>
            <AccordionSummary expandIcon={<BiSolidChevronDown/>}
                              aria-controls="panel1-content"
                              id="panel1-header" sx={prioTheme(task)}>
              <Typography>
                <BiEditAlt className={"inline pb-1 pr-1"} size={18}
                           onClick={(e) => {
                             handleEdit(task);
                             e.stopPropagation();
                           }} />
                <span className={"capitalize"}>{task.name}</span>
              </Typography>
            </AccordionSummary>
            <hr/>
            <AccordionDetails>
              <Typography variant={"body2"}>
                {task.details}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      })}
    </ul>

    {/* edit modal */}
    {/* todo: once it works extract form to separate component, pass form action and (optional) task data */}
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={"bg-white-rgb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 shadow-2xl p-4"}>
        <Title tier={"h2"} text={"Edit task:"} />
        <form action={formAction}>
          <TextField id="name" name="name" label="Task name" defaultValue={editedTask?.name}
                     variant="outlined" sx={{my: 1, width: "100%"}}
                     required />
          <TextField id="details" name="details" label="Details" defaultValue={editedTask?.details}
                     multiline minRows={2} variant="outlined" sx={{my: 1, width: "100%"}}
                     required />
          <Box sx={{my: 1, width: "100%"}}>
            <FormControl fullWidth>
              <InputLabel id="priority">Priority</InputLabel>
              <Select labelId="priority" id="priority" name="priority"
                      defaultValue={editedTask?.priority} label="Priority"
                      required
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"normal"}>Normal</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <input type={"hidden"} name={"status"} value={editedTask.status} />

          <div className={"flex justify-between"}>
            <Button color={"secondary"} onClick={handleClose}>Close</Button>
            <SubmitButton size={"sm"} />
          </div>
        </form>
      </Box>
    </Modal>
  </>
}
