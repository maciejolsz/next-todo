"use client"

import Link from "next/link";
import clsx from "clsx";
import {usePathname} from "next/navigation";

export default function NavButton(props : {title: string, url: string, children?: any}) {
  const path = usePathname();

  return <Link href={props.url}>
    <button className={clsx(
      "px-4 py-2 border-b-2 border-b-orange-400 text-black hover:text-white hover:bg-orange-400",
      { 'text-white bg-orange-400': path === props.url }
    )}>
      {props.children} {props.title}
    </button>
  </Link>
}
