import { Newsreader } from "next/font/google";

const newsreader = Newsreader({ subsets: ['latin'] })

export default function Header({text}: {text: string}) {
  return <h1 className={`text-[32px] text-center mb-8 ${newsreader.className}`}>{text}</h1>
}
