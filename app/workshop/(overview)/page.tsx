import Card, {CardType} from "@/app/ui/workshop/card";
import { homeCards } from "@/app/workshop/(overview)/config";
import Header from "@/app/ui/header";

export default function Page() {
  return (<>
    <main>
      <Header text={"Where do we start?"} />
      <div className={"flex flex-row px-40"}>
        {homeCards.map((cardProps: CardType, key) => {
          return <Card key={key} {...cardProps} />
        })}
      </div>
    </main>
  </>)
}
