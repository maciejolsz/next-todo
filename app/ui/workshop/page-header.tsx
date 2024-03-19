"use client"

import Link from "next/link";
import { Roboto_Slab } from "next/font/google"
import { useLocale } from "next-intl";
import { BiListCheck, BiCalendar, BiTimer, BiHomeAlt, BiWrench } from "react-icons/bi";
import { RiSettings2Line } from "react-icons/ri";

import NavButton from "@/app/ui/nav-button";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export default function PageHeader() {
  const locale = useLocale();
  const settingsPath = "workshop/settings";
  const iconClass = "inline pb-1";

  const menuItems = [
    { name: 'Home', url: `/${locale}/workshop`, icon: BiHomeAlt },
    { name: 'Calendar', url: `/${locale}/workshop/calendar`, icon: BiCalendar },
    { name: 'Tasks', url: `/${locale}/workshop/tasks`, icon: BiListCheck,},
    { name: 'Pomodoro', url: `/${locale}/workshop/pomodoro`, icon: BiTimer },
  ];

  return <div className="w-full py-[40px] flex-row justify-between items-center inline-flex">
    <div className={`text-[32px] text-orange-rgb ${robotoSlab.className}`}>
      <Link href={`/${locale}/workshop`}>
        <BiWrench size="32" className={"inline pb-1 mr-1"}/><span className={"hover:underline"}>Workshop.</span>
      </Link>
    </div>

    <nav className={""}>
      {menuItems.map((menuItem, i) => {
        const LinkIcon = menuItem.icon;
        return <NavButton title={menuItem.name}
                          href={menuItem.url}
                          icon={<LinkIcon size="24" className={iconClass} />}
                          key={i} />
      })}
    </nav>

    <div>
      <NavButton title={"Settings"}
                 href={`/${locale}/${settingsPath}`}
                 icon={<RiSettings2Line size="24" className={iconClass} />} />
    </div>
  </div>
}
