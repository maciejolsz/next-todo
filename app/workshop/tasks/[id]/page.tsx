"use client"

import {usePathname} from "next/navigation";
import {fetchTask} from "@/app/lib/fetch-data";
import {UniqueIdentifier} from "@dnd-kit/core";

export default async function Page() {
  const id = usePathname().split("/").pop();
  const task = await fetchTask(id as UniqueIdentifier);
  return <>{task.name}</>;
}
