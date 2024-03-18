import Title from "@/app/ui/title";

import Settings from "@/app/ui/workshop/settings/settings";
import { MusicThemeType, TimerType } from "@/app/lib/types";
import { fetchMusicThemes } from "@/app/lib/fetch-data";

export default async function Page() {
  const themes: MusicThemeType[] = await fetchMusicThemes();
  const timers: TimerType[] = [];

  return <main>
    <Title>Settings</Title>
    <div className={"main-content"}>
      <Settings themes={themes} timers={timers}/>
    </div>
  </main>
}
