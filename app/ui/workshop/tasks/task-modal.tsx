"use client"

import { useTranslations } from "next-intl";

import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";

import Title from "@/app/ui/title";
import SubmitButton from "@/app/ui/workshop/submit-button";
import { HandleToggle, TaskType } from "@/app/lib/types";
import {BaseSyntheticEvent, useState} from "react";

type TaskModalPropsType = {
  openModal: boolean;
  formAction: ((formData: FormData) => void);
  handleModalToggle: HandleToggle;
  selectedTask?: TaskType;
}
const DETAILS_LIMIT = 255;
export default function TaskModal({selectedTask, openModal, handleModalToggle, formAction}: TaskModalPropsType) {
  const [detailsLength, setDetailsLength] = useState(selectedTask?.name.length || 0);
  const t = useTranslations();

  const defaultValues: TaskType = {
    name: "",
    details: "",
    status: "new",
    priority: "normal",
    ...selectedTask // merge selectedTask into defaultValues
  }

  const handleDetailsChange = (e: BaseSyntheticEvent) => {
    setDetailsLength(e.target.value.length);
  }

  return <Modal
    open={openModal}
    onClose={handleModalToggle.close}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className={"bg-white-rgb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 shadow-2xl p-4"}>
      <Title tier={"h2"}>{t('tasks.addTaskModal.title')}</Title>
      <form action={formAction}>
        <TextField id="name"
                   name="name"
                   label={t('tasks.addTaskModal.name')}
                   variant="outlined"
                   sx={{my: 1, width: "100%"}}
                   defaultValue={defaultValues.name}
                   required />
        <TextField id="details"
                   name="details"
                   label={t('tasks.addTaskModal.details')}
                   multiline
                   variant="outlined"
                   minRows={2}
                   sx={{my: 1, width: "100%"}}
                   defaultValue={defaultValues.details}
                   inputProps={{maxLength: DETAILS_LIMIT}}
                   helperText={<span className={"block text-right"}>{detailsLength}/{DETAILS_LIMIT}</span>}
                   onChange={(event) => handleDetailsChange(event)}
        />
        <Box sx={{my: 1, width: "100%"}}>
          <FormControl fullWidth>
            <InputLabel id="priority">{t('tasks.addTaskModal.priority')}</InputLabel>
            <Select labelId="priority"
                    id="priority"
                    name="priority"
                    label={t('tasks.addTaskModal.priority')}
                    defaultValue={defaultValues.priority}
                    required>
              <MenuItem value={"low"}>{t('tasks.addTaskModal.prioLow')}</MenuItem>
              <MenuItem value={"normal"}>{t('tasks.addTaskModal.prioNormal')}</MenuItem>
              <MenuItem value={"high"}>{t('tasks.addTaskModal.prioHigh')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <input type={"hidden"} name={"status"} value={defaultValues.status}/>

        <div className={"flex justify-between mt-8"}>
          <Button color={"secondary"}
                  onClick={handleModalToggle.close}>
            {t('tasks.addTaskModal.close')}
          </Button>
          <SubmitButton size={"mini"} text={t('tasks.addTaskModal.submit')} textAlt={t('tasks.addTaskModal.submitting')}/>
        </div>
      </form>
    </Box>
  </Modal>;
}
