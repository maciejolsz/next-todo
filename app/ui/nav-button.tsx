"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import {twMerge} from "tailwind-merge";

type NavButtonProps = {
  title: string;
  url: string;
  children?: any;
}

export default function NavButton(props: NavButtonProps) {
  const path = usePathname();
  return <Link href={props.url}>
    <button className={twMerge(
      "px-4 py-2 border-b-2 border-b-orange-rgb text-black-rgb transition-all duration-100 ease-linear hover:text-white-rgb hover:bg-orange-rgb",
      path === props.url ? 'text-white-rgb bg-orange-rgb' : ''
    )}>
      {props.children} {props.title}
    </button>
  </Link>
}
