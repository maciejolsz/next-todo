"use client"

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Roboto_Slab } from "next/font/google";
import {
  BiAlarm,
  BiAlarmExclamation,
  BiAlarmSnooze, BiDotsVerticalRounded,
  BiSolidChevronDown
} from "react-icons/bi";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  Box, Button, FormControl, InputLabel, Menu, MenuItem, Modal, Select, Snackbar, TextField
} from "@mui/material";

import { TaskStatusType, TaskType } from "@/app/lib/types";
import { deleteTask, editTask } from "@/app/lib/form-actions";
import { kebabToText } from "@/app/lib/helpers";
import Title from "@/app/ui/title";
import SubmitButton from "@/app/ui/workshop/submit-button";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })
const PriorityIcon = {
  high: <BiAlarmExclamation className={"inline pb-0 pl-1 text-orange-rgb"} size={"22"}/>,
  normal: <BiAlarm className={"inline pb-0 pl-1 text-black-rgb"} size={"22"}/>,
  low: <BiAlarmSnooze className={"inline pb-0 pl-1 text-gray-400"} size={"22"}/>
};
export default function TaskListFull({ type, tasks }: { type: TaskStatusType, tasks: TaskType[] }) {
  // contains recently updated formState - edit/delete
  const [status, setStatus] = useState("");
  // set on task options click, stores task data
  const [selectedTask, setSelectedTask] = useState<TaskType>(tasks[0]);

  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | EventTarget & SVGElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const deleteTaskWithId = deleteTask.bind(null, selectedTask.id);
  const [deleteFormState, deleteFormAction] = useFormState(deleteTaskWithId, null);
  const editTaskWithId = editTask.bind(null, selectedTask.id);
  const [editFormState, editFormAction] = useFormState(editTaskWithId, null);

  // closure used for open/close modal, snack and menu
  const createHandleToggle = (toggleFunction: (val: boolean) => void) => ({
    open: () => toggleFunction(true),
    close: () => toggleFunction(false)
  });

  const handleModalToggle = createHandleToggle(setOpenModal);
  const handleSnackToggle = createHandleToggle(setOpenSnack);
  const handleMenuToggle = createHandleToggle(setOpenMenu);

  // todo: refactor this!
  useEffect(() => {
    if (!editFormState?.type) return;
    setStatus(editFormState.type);
    handleModalToggle.close();
    handleSnackToggle.open();
  }, [editFormState]);

  useEffect(() => {
    if (!deleteFormState?.type) return;
    setStatus(deleteFormState.type);
    handleModalToggle.close();
    handleSnackToggle.open();
    //
  }, [deleteFormState]);

  return <>
    <div className={`w-full mb-2 text-lg capitalize ${robotoSlab.className}`}>
      {kebabToText(type)}
    </div>

    <ul>
      {tasks.map((task) => {
        return <div key={task.id} className={"my-4"}>
          <Accordion elevation={2} disableGutters={true}>
            <div className={"hover:bg-gray-rgb"}>
              <AccordionSummary expandIcon={<BiSolidChevronDown/>}
                                aria-controls="panel1-content"
                                id="panel1-header">
                <Typography>
                  <BiDotsVerticalRounded className={"inline pb-0 mr-2 rounded-full hover:bg-gray-200"} size={18}
                                         onClick={(e) => {
                                           e.stopPropagation();
                                           setSelectedTask(task);
                                           setAnchorEl(e.currentTarget);
                                           handleMenuToggle.open();
                                           // handleOpenMenu();
                                         }}/>
                  <span className={"capitalize"}>{task.name}</span>
                </Typography>
                {PriorityIcon[task.priority]}
              </AccordionSummary>
            </div>

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
      open={openModal}
      onClose={handleModalToggle.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={"bg-white-rgb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 shadow-2xl p-4"}>
        <Title tier={"h2"} text={"Edit task:"}/>
        <form action={editFormAction}>
          <TextField id="name" name="name" label="Task name" defaultValue={selectedTask?.name}
                     variant="outlined" sx={{my: 1, width: "100%"}}
                     required/>
          <TextField id="details" name="details" label="Details" defaultValue={selectedTask?.details}
                     multiline minRows={2} variant="outlined" sx={{my: 1, width: "100%"}}
                     required/>
          <Box sx={{my: 1, width: "100%"}}>
            <FormControl fullWidth>
              <InputLabel id="priority">Priority</InputLabel>
              <Select labelId="priority" id="priority" name="priority"
                      defaultValue={selectedTask?.priority} label="Priority"
                      required
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"normal"}>Normal</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <input type={"hidden"} name={"status"} value={selectedTask.status}/>

          <div className={"flex justify-between"}>
            <Button color={"secondary"} onClick={handleModalToggle.close}>Close</Button>
            <SubmitButton size={"sm"}/>
          </div>
        </form>
      </Box>
    </Modal>

    <div>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackToggle.close}
                message={status === "success" ? "SUCCESS" : "FAILURE"}/>
    </div>

    <Menu id="basic-menu" anchorEl={anchorEl} open={openMenu} onClose={handleMenuToggle.close}>
      <MenuItem onClick={() => {
        handleModalToggle.open();
        handleMenuToggle.close();
      }}>Edit</MenuItem>
      <MenuItem onClick={handleMenuToggle.close}>
        <form action={deleteFormAction}>
          <button>Delete</button>
        </form>
      </MenuItem>
    </Menu>
  </>
}
