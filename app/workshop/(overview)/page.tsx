import { Newsreader } from "next/font/google";
import Card, {CardType} from "@/app/ui/workshop/card";
import { homeCards } from "@/app/workshop/(overview)/config";

const newsreader = Newsreader({ subsets: ['latin'] })

export default function Page() {
  return (<>
    <main>
      <h1 className={`text-[32px] text-center mb-8 ${newsreader.className}`}>Where do we start?</h1>
      <div className={"flex flex-row px-40"}>
        {homeCards.map((cardProps: CardType, key) => {
          return <Card key={key} {...cardProps} />
        })}
      </div>
    </main>
  </>)
}
