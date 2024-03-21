
import Link from "next/link";
import { Roboto_Slab } from "next/font/google"
import {useLocale, useTranslations} from "next-intl";
import { BiListCheck, BiCalendar, BiTimer, BiHomeAlt, BiWrench } from "react-icons/bi";
import { RiSettings2Line } from "react-icons/ri";

import NavButton from "@/app/ui/nav-button";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export default function PageHeader() {
  const locale = useLocale();
  const t = useTranslations("workshop");

  const settingsPath = "workshop/settings";
  const iconClass = "inline pb-1";

  const menuItems = [
    { name: t('nav-menu.home'), url: `/${locale}/workshop`, icon: BiHomeAlt },
    { name: t('nav-menu.calendar'), url: `/${locale}/workshop/calendar`, icon: BiCalendar },
    { name: t('nav-menu.tasks'), url: `/${locale}/workshop/tasks`, icon: BiListCheck,},
    { name: t('nav-menu.pomodoro'), url: `/${locale}/workshop/pomodoro`, icon: BiTimer },
  ];

  return <div className="w-full py-[40px] flex-row justify-between items-center inline-flex">
    <div className={`text-[32px] text-orange-rgb ${robotoSlab.className}`}>
      <Link href={`/${locale}/workshop`}>
        <BiWrench size="32" className={"inline pb-1 mr-1"}/><span className={"hover:underline"}>{t('nav-menu.workshop')}</span>
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
      <NavButton title={t('nav-menu.settings')}
                 href={`/${locale}/${settingsPath}`}
                 icon={<RiSettings2Line size="24" className={iconClass} />} />
    </div>
  </div>
}
