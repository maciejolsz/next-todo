import Link from "next/link";
import NavButton from "@/app/ui/nav-button";
import { Newsreader } from "next/font/google"
import { BiListCheck, BiCalendar, BiTimer, BiHomeAlt, BiFace, BiWrench } from "react-icons/bi";

const newsreader = Newsreader({ subsets: ['latin'] })

const links = [
  { name: 'Home', url: '/workshop', icon: BiHomeAlt },
  { name: 'TODOs', url: '/workshop/todos', icon: BiListCheck,},
  { name: 'Calendar', url: '/workshop/calendar', icon: BiCalendar },
  { name: 'Pomodoro', url: '/workshop/pomodoro', icon: BiTimer },
];

export default function Header() {
  const iconClass = "inline pb-1";
  return <div className="w-full py-[40px] flex-row justify-between items-center inline-flex">
    <div className={`text-[32px] ${newsreader.className}`}>
      <Link href={"/workshop"}><BiWrench size="32" className={"inline pb-1 mr-1"}/>Workshop</Link>
    </div>
    <nav className={""}>
      {links.map((link, i) => {
        const LinkIcon = link.icon;
        return <NavButton key={i} title={link.name} url={link.url}>
          <LinkIcon size="24" className={iconClass} />
        </NavButton>
      })}
    </nav>
    <div>
      <NavButton title={"Profile"} url={"/profile"}>
        <BiFace size="24" className={iconClass} />
      </NavButton>
    </div>
  </div>
}
