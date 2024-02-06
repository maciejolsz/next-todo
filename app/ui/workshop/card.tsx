import type { IconType } from "react-icons";
import { Roboto } from "next/font/google";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export type CardType = {
  icon: IconType;
  title: string;
  desc: string;
  subDesc: string;
  href: string;
  className?: string;
};

const roboto = Roboto({ subsets: ['latin'], weight: "400" })

export default function Card(props: CardType) {
  const CardIcon = props.icon;
  return <div className={twMerge("basis-1/3 hover:scale-110 transition-all duration-100 ease-linear hover:shadow-2xl", props.className ? `${props.className}` : "")}>
    <Link href={props.href}>
      <div className={"w-full h-[192px] bg-white py-8"}>
        <CardIcon className={"h-full w-1/2 mx-auto text-black-rgb"}/>
      </div>
      <div className={"w-full pl-6 pb-6 pr-6 bg-white"}>
        <div className={`text-black text-lg leading-relaxed ${roboto.className}`}>
          {props.title}
        </div>
        <p className={`text-orange-400 text-sm leading-relaxed ${roboto.className}`}>
          {props.desc}
        </p>
        <p className={`text-neutral-500 text-sm leading-normal ${roboto.className}`}>
          {props.subDesc}
        </p>
      </div>
    </Link>
  </div>
}
