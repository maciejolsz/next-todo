import { Roboto_Slab } from "next/font/google";

import { TaskType } from "@/app/lib/types";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { BiSolidChevronDown } from "react-icons/bi";

import { kebabToText } from "@/app/lib/helpers";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export default function TaskList({ type, tasks }: { type: string, tasks: TaskType[] }) {
  return <>
    <div className={`w-full mb-2 text-lg capitalize ${robotoSlab.className}`}>
      {kebabToText(type)}
    </div>

    {/* if no tasks */}
    {tasks.length === 0 && <>-</> }

    {/* if there are some */}
    <ul>
      {tasks.map((task) => {
        return <div key={task.id} className={"my-4"}>
          <Accordion elevation={2} disableGutters={true}>
            <AccordionSummary expandIcon={<BiSolidChevronDown/>}
                              aria-controls="panel1-content"
                              id="panel1-header">
              <Typography>
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
  </>
}
