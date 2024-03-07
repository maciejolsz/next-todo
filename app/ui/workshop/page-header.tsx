"use client"

import Link from "next/link";
import MyButton from "@/app/ui/my-button";
import { Roboto_Slab } from "next/font/google"
import { BiListCheck, BiCalendar, BiTimer, BiHomeAlt, BiFace, BiWrench } from "react-icons/bi";
import { usePathname } from "next/navigation";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

const menuItems = [
  { name: 'Home', url: '/workshop', icon: BiHomeAlt },
  { name: 'Calendar', url: '/workshop/calendar', icon: BiCalendar },
  { name: 'Tasks', url: '/workshop/tasks', icon: BiListCheck,},
  { name: 'Pomodoro', url: '/workshop/pomodoro', icon: BiTimer },
];

export default function PageHeader() {
  const currentPath = usePathname();
  const workshopPath = "/workshop/profile";
  const iconClass = "inline pb-1";

  return <div className="w-full py-[40px] flex-row justify-between items-center inline-flex">
    <div className={`text-[32px] text-orange-rgb ${robotoSlab.className}`}>
      <Link href={"/workshop"}>
        <BiWrench size="32" className={"inline pb-1 mr-1"}/><span className={"hover:underline"}>Workshop.</span>
      </Link>
    </div>

    <nav className={""}>
      {menuItems.map((menuItem, i) => {
        const LinkIcon = menuItem.icon;
        return <Link key={i} href={menuItem.url}>
          <MyButton title={menuItem.name} isActive={currentPath === menuItem.url}>
            <LinkIcon size="24" className={iconClass} />
          </MyButton>
        </Link>
      })}
    </nav>

    <div>
      <Link href={workshopPath}>
        <MyButton title={"Profile"} isActive={currentPath === workshopPath}>
          <BiFace size="24" className={iconClass} />
        </MyButton>
      </Link>
    </div>
  </div>
}
