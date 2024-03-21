import { useTranslations } from "next-intl";

import Title from "@/app/ui/title";

export default function Loading() {
  const t = useTranslations();
  return <div className={"text-center animate-bounce"}>
    <Title tier={"h3"}>{t("Index.loading")}</Title>
  </div>
}
