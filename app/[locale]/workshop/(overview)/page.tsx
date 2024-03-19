import Card, {CardType} from "@/app/ui/workshop/card";

import Title from "@/app/ui/title";
import { homeCards } from "@/app/ui/workshop/menu-config";

export default function Page() {
  return (<>
    <main>
      <Title>Where do we start?</Title>
      <div className={"flex flex-row px-40 justify-center"}>
        {homeCards.map((cardProps: CardType, key) => {
          return <Card key={key} {...cardProps} className={"mx-4"}/>
        })}
      </div>
    </main>
  </>)
}
