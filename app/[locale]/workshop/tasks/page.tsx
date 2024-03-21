import { Suspense } from "react";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import AddTask from "@/app/ui/workshop/tasks/add-task";
import Title from "@/app/ui/title";
import TasksManagerSkeleton from "@/app/ui/skeletons/tasks-manager";
import TasksManagerDnd from "@/app/ui/workshop/tasks/tasks-manager-dnd";
import { fetchTasks } from "@/app/lib/fetch-data";
import { LocaleMessages } from "@/globals";

export default async function Page() {
  const tasks = await fetchTasks();
  const locale = await getLocale();
  const messages = await getMessages({locale: locale});
  const workshopMsgs = (messages as LocaleMessages).workshop;
  const t = await getTranslations('workshop');

  return <main>
    <Title>{t("tasks.title")}</Title>
    <div className={""}>
      <NextIntlClientProvider messages={workshopMsgs} locale={locale}>
        <AddTask />
        <Suspense key={"tasks"} fallback={<TasksManagerSkeleton />}>
          <TasksManagerDnd tasks={tasks}/>
          {/* ICE - no dnd here: */}
          {/* <TasksManager />*/}
        </Suspense>
      </NextIntlClientProvider>
    </div>
  </main>
}
