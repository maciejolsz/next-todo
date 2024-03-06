import { Roboto_Slab } from "next/font/google";

import { kebabToText } from "@/app/lib/helpers";
import { TaskStatusType } from "@/app/lib/types";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

type TaskListProps = { type: TaskStatusType, isOver: boolean, customRef: (element: HTMLElement | null) => void; }

export default function TaskListEmpty({ type, isOver, customRef }: TaskListProps) {
  const isOverClass = isOver ? "opacity-30" : undefined;

  return <div ref={customRef} className={`w-full h-full ${isOverClass}`}>
    <div className={`w-full mb-2 text-lg capitalize ${robotoSlab.className}`}>
      {kebabToText(type)}
    </div>

    <div>Nothing here yet...</div>
  </div>;
}
