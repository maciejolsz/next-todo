import { BiCalendar, BiListCheck, BiTimer } from "react-icons/bi";
import { CardType } from "@/app/ui/workshop/card";

export const homeCards: CardType[] = [
  {
    href: "/workshop/todos",
    icon: BiListCheck,
    title: "ToDos",
    desc: "Manage your tasks ezpz!",
    subDesc: "One thing at a time...",
  },
  {
    href: "/workshop/calendar",
    icon: BiCalendar,
    title: "Calendar",
    desc: "Keep up with everything!",
    subDesc: "You don’t wanna miss a thing...",
    className: "mx-8"
  },
  {
    title: "Pomodoro",
    desc: "Let's get to it!",
    subDesc: "Remember to take a break!",
    href: "/workshop/pomodoro",
    icon: BiTimer,
  }
]
