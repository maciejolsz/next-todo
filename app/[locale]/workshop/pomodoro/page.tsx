import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { fetchMusicThemes, fetchTasks } from "@/app/lib/fetch-data";
import { MusicThemeType, TaskType } from "@/app/lib/types";
import Title from "@/app/ui/title";
import Events from "@/app/ui/workshop/pomodoro/events";
import Pomodoro from "@/app/ui/workshop/pomodoro/pomodoro";
import { grabGoogleCreds } from "@/app/lib/helpers";
import { LocaleMessages } from "@/globals";

export default async function Page() {
  const locale = await getLocale();
  const messages = await getMessages({locale: locale});
  const workshopMsgs = (messages as LocaleMessages).workshop;
  const t = await getTranslations();

  const calendarIds = [process.env.CALENDAR_ID0 || "", process.env.CALENDAR_ID1 || ""]
  const { apiKey, clientId } = grabGoogleCreds();

  const onItTasks: TaskType[] = await fetchTasks().then((tasks) => {
    return tasks.filter(task => task.status === 'on-it');
  });

  const themes: MusicThemeType[] = await fetchMusicThemes()

  return <main>
    <Title>{t('workshop.pomodoro.title')}</Title>
    <div className={"flex justify-between"}>
      <NextIntlClientProvider messages={workshopMsgs} locale={locale}>
        <Suspense key={"onItTasks"} fallback={<div className={"main-content w-1/2"}>{t("Index.loading")}</div>}>
          <Pomodoro onItTasks={onItTasks} themes={themes}/>
        </Suspense>

        <div className={"main-content w-1/2"}>
          <Title tier={"h3"}>{t('workshop.pomodoro.comingEvents')}</Title>
          <Events apiKey={apiKey} clientId={clientId} calendarIds={calendarIds}/>
        </div>
      </NextIntlClientProvider>
    </div>
  </main>
}
