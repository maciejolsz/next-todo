
import { Dispatch, SetStateAction } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxDragHandleDots1 } from "react-icons/rx";

import { useDraggable } from "@dnd-kit/core";
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

export default function TaskDraggable({task, setSelectedTask, setAnchorEl, openMenu}: TaskProps) {
  const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
    id: task.id!,
  });

  const transformStyle = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  const draggingStyle = isDragging ? { opacity: 0.8 } : { opacity: 1 };

  return <div key={task.id} className={"my-4"} ref={setNodeRef} style={{...transformStyle, ...draggingStyle}}>
    <Accordion elevation={2} disableGutters={true}>
      <div className={"hover:bg-gray-rgb"}>
        <AccordionSummary
                          aria-controls="panel1-content"
                          id="panel1-header">
          <div className={"w-full"}>

            <span {...listeners} {...attributes}><RxDragHandleDots1 className={"inline text-gray-400 pb-1"} size={20}/></span>
            {PriorityIcon[task.priority]}
            <span className={"capitalize"}>{task.name}</span>
            <BiDotsVerticalRounded className={"mt-1 float-right rounded-full hover:bg-gray-300"} size={18}
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setSelectedTask(task);
                                 setAnchorEl(e.currentTarget);
                                 openMenu();
                               }}/>
          </div>

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
