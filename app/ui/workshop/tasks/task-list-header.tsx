import { Roboto_Slab } from "next/font/google";

import { TaskStatusType } from "@/app/lib/types";
import { kebabToText } from "@/app/lib/helpers";
import Link from "next/link";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] });

export default function TaskListHeader({type}: {type: TaskStatusType}) {
  return <div className={`mb-2 flex align-bottom justify-between`}>
    <div className={`text-lg capitalize  ${robotoSlab.className}`}>
      {kebabToText(type)}
    </div>
    <div className={"pt-1"}>
      {type==="on-it" && <Link href={"/workshop/pomodoro"} className={"underline font-bold"}>Let's get to work!</Link>}
    </div>
  </div>
}
