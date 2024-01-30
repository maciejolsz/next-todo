import Link from "next/link";
import NavButton from "@/app/ui/nav-button";
import {Newsreader} from "next/font/google"
const newsreader = Newsreader({ subsets: ['latin'] })
import {
  HomeIcon,
  PlayCircleIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const links = [
  { name: 'Home', url: '/workshop', icon: HomeIcon },
  { name: 'TODOs', url: '/workshop/todos', icon: ClipboardDocumentListIcon,},
  { name: 'Calendar', url: '/workshop/calendar', icon: CalendarIcon },
  { name: 'Pomodoro', url: '/workshop/pomodoro', icon: PlayCircleIcon },
];

export default function Header() {
  return <div className="w-full py-[40px] flex-row justify-between items-center inline-flex">
    <div className={`text-[32px] ${newsreader.className}`}>
      <Link href={"/workshop"}>Workshop</Link>
    </div>
    <nav>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return <NavButton  title={link.name} url={link.url}><LinkIcon className={"w-5 inline"} /></NavButton>
      })}

    </nav>
    <div>
      <NavButton title={"Profile"} url={"/profile"}><UserIcon className={"w-5 inline"} /></NavButton>
    </div>
  </div>
}
