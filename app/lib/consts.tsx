import { BiAlarm, BiAlarmExclamation, BiAlarmSnooze } from "react-icons/bi";

export const PriorityIcon = {
  high: <BiAlarmExclamation className={"inline pb-1 pr-1 text-orange-rgb"} size={"20"}/>,
  normal: <BiAlarm className={"inline pb-1 pr-1 text-black-rgb"} size={"20"}/>,
  low: <BiAlarmSnooze className={"inline pb-1 pr-1 text-gray-400"} size={"20"}/>
};
