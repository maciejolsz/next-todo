import { Dispatch, SetStateAction } from "react";
import { BiDotsVerticalRounded, BiSolidChevronDown } from "react-icons/bi";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";

import { TaskType } from "@/app/lib/types";
import { PriorityIcon } from "@/app/lib/consts";

type TaskProps = {
  task: TaskType;
  setSelectedTask: Dispatch<SetStateAction<TaskType>>;
  setAnchorEl: Dispatch<SetStateAction<(EventTarget & SVGElement) | null>>;
  openMenu: () => void;
}

export default function Task({task, setSelectedTask, setAnchorEl, openMenu}: TaskProps) {
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
                                     openMenu();
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
  </div>;
}
