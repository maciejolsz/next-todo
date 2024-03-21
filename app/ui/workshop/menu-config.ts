import { BiCalendar, BiListCheck, BiTimer } from "react-icons/bi";
import { CardType } from "@/app/ui/workshop/card";

export const homeCards: CardType[] = [
  {
    href: "workshop/calendar",
    icon: BiCalendar,
    type: "calendar",

  },
  {
    href: "workshop/tasks",
    icon: BiListCheck,
    type: "tasks",
  },
  {
    href: "workshop/pomodoro",
    icon: BiTimer,
    type: "pomodoro",
  }
]
