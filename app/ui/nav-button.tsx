"use client"

import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavButtonProps = {
  title: string;
  href: string;
  icon?: any;
}
export default function NavButton({title, icon, href}: NavButtonProps) {
  const currentPath = usePathname();
  const isActive: boolean = currentPath === href;

  return <Link href={href}>
    <button className={twMerge(
      "px-4 py-2 border-b-2 border-b-orange-rgb font-light text-black-rgb transition-all duration-100 ease-linear hover:text-white-rgb hover:bg-orange-rgb",
      isActive ? 'text-white-rgb bg-orange-rgb' : ''
    )}>
      { icon && icon } { title }
    </button>
  </Link>;
}
