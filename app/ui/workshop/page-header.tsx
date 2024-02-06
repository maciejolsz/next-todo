"use client"

import Link from "next/link";
import MyButton from "@/app/ui/my-button";
import { Newsreader } from "next/font/google"
import { BiListCheck, BiCalendar, BiTimer, BiHomeAlt, BiFace, BiWrench } from "react-icons/bi";
import { usePathname } from "next/navigation";

const newsreader = Newsreader({ subsets: ['latin'] })

const menuItems = [
  { name: 'Home', url: '/workshop', icon: BiHomeAlt },
  { name: 'Tasks', url: '/workshop/tasks', icon: BiListCheck,},
  { name: 'Calendar', url: '/workshop/calendar', icon: BiCalendar },
  { name: 'Pomodoro', url: '/workshop/pomodoro', icon: BiTimer },
];

export default function PageHeader() {
  const currentPath = usePathname();
  const workshopPath = "/workshop/profile";
  const iconClass = "inline pb-1";

  return <div className="w-full py-[40px] flex-row justify-between items-center inline-flex">
    <div className={`text-[32px] ${newsreader.className}`}>
      <Link href={"/workshop"}><BiWrench size="32" className={"inline pb-1 mr-1"}/>Workshop.</Link>
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
