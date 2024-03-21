import type { IconType } from "react-icons";
import {Roboto, Roboto_Slab} from "next/font/google";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import {useTranslations} from "next-intl";

export type CardType = {
  href: string;
  icon: IconType;
  type: string;

  title?: string;
  desc?: string;
  subDesc?: string;
  className?: string;
};

const roboto = Roboto({ subsets: ['latin'], weight: "400" })
const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export default function Card(props: CardType) {
  const t = useTranslations("workshop");

  const title = `home.cards.${props.type}.title`;
  const desc = `home.cards.${props.type}.desc`;
  const subDesc = `home.cards.${props.type}.subDesc`;

  const CardIcon = props.icon;
  return <div className={twMerge("basis-1/3 hover:scale-110 transition-all duration-100 ease-linear hover:shadow-2xl", props.className ? `${props.className}` : "")}>
    <Link href={props.href}>
      <div className={"w-full h-[192px] bg-white py-8"}>
        <CardIcon className={"h-full w-1/2 mx-auto text-black-rgb"}/>
      </div>
      <div className={"w-full pl-6 pb-6 pr-6 bg-white"}>
        <div className={`text-black text-lg leading-relaxed ${robotoSlab.className}`}>
          {t(title)}
        </div>
        <p className={`text-orange-400 text-sm leading-relaxed ${roboto.className}`}>
          {t(desc)}
        </p>
        <p className={`text-neutral-500 text-sm leading-normal ${roboto.className}`}>
          {t(subDesc)}
        </p>
      </div>
    </Link>
  </div>
}
