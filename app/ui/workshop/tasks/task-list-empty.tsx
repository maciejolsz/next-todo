import { Roboto_Slab } from "next/font/google";

import { kebabToText } from "@/app/lib/helpers";
import { TaskStatusType } from "@/app/lib/types";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export default function TaskListEmpty({type}: { type: TaskStatusType }) {
  return <>
    <div className={`w-full mb-2 text-lg capitalize ${robotoSlab.className}`}>
      {kebabToText(type)}
    </div>

    <div>-</div>
  </>;
}
