import { Roboto_Slab } from "next/font/google";
import { createElement } from "react";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

type HeaderProps = {
  tier?: "h1" | "h2" | "h3";
  children: string;
};

export default function Title({tier = "h1", children}: HeaderProps) {
  return createElement(
    tier,
    { className: `${robotoSlab.className}` },
    children
  );
}
