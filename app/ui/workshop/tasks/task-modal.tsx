import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";

import Title from "@/app/ui/title";
import SubmitButton from "@/app/ui/workshop/submit-button";
import {HandleToggle, TaskType} from "@/app/lib/types";

type TaskModalPropsType = {
  openModal: boolean;
  formAction: ((formData: FormData) => void);
  handleModalToggle: HandleToggle;
  selectedTask?: TaskType;
}
export default function TaskModal({selectedTask, openModal, handleModalToggle, formAction}: TaskModalPropsType) {
  const defaultValues: TaskType = {
    name: "",
    details: "",
    status: "new",
    priority: "normal",
    ...selectedTask // merge selectedTask into defaultValues
  }

  return <Modal
    open={openModal}
    onClose={handleModalToggle.close}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className={"bg-white-rgb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 shadow-2xl p-4"}>
      <Title tier={"h2"} text={"Edit task:"}/>
      <form action={formAction}>
        <TextField id="name"
                   name="name"
                   label="Task name"
                   variant="outlined"
                   sx={{my: 1, width: "100%"}}
                   defaultValue={defaultValues.name}
                   required />
        <TextField id="details"
                   name="details"
                   label="Details"
                   multiline
                   variant="outlined"
                   minRows={2}
                   sx={{my: 1, width: "100%"}}
                   defaultValue={defaultValues.details}
                   required />
        <Box sx={{my: 1, width: "100%"}}>
          <FormControl fullWidth>
            <InputLabel id="priority">Priority</InputLabel>
            <Select labelId="priority"
                    id="priority"
                    name="priority"
                    label="Priority"
                    defaultValue={defaultValues.priority}
                    required>
              <MenuItem value={"low"}>Low</MenuItem>
              <MenuItem value={"normal"}>Normal</MenuItem>
              <MenuItem value={"high"}>High</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <input type={"hidden"} name={"status"} value={defaultValues.status}/>

        <div className={"flex justify-between"}>
          <Button color={"secondary"}
                  onClick={handleModalToggle.close}>
            Close
          </Button>
          <SubmitButton size={"sm"}/>
        </div>
      </form>
    </Box>
  </Modal>;
}
