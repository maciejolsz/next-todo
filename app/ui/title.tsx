import { Newsreader } from "next/font/google";
import { createElement } from "react";

const newsreader = Newsreader({ subsets: ['latin'] })
type HeaderProps = {
  tier?: "h1" | "h2" | "h3";
  text: string;
};
export default function Title({tier = "h1", text}: HeaderProps) {
  return createElement(
    tier,
    { className: `${newsreader.className}` },
    text
  );
}
