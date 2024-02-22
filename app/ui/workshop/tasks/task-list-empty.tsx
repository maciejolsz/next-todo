
import { Roboto_Slab } from "next/font/google";

import { useDroppable } from "@dnd-kit/core";

import { kebabToText } from "@/app/lib/helpers";
import { TaskStatusType } from "@/app/lib/types";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

type TaskListProps = { type: TaskStatusType, isOver: boolean, customRef: (element: HTMLElement | null) => void; }

export default function TaskListEmpty({type, isOver, customRef}: TaskListProps) {
  const isOverClass = isOver ? "bg-green-400" : undefined;

  return <div ref={customRef} className={"border-orange-rgb border-2"}>
    <div className={`w-full mb-2 text-lg capitalize ${robotoSlab.className} ${isOverClass}`}>
      {kebabToText(type)}
    </div>

    <div>-</div>
  </div>;
}
