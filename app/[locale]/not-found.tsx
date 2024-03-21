import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import NavButton from "@/app/ui/nav-button";

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('Index');

  return <main className={"flex flex-col w-[300px] h-[300px] pt-12 m-auto mt-64"}>
    <Image className="rounded-full mx-auto mb-8" src={"/img.png"} alt={"Page not found."} width={120} height={120}/>
    <div>
      <p className={"text-center leading-snug"}>
        {t('404-txt')}<br />
      </p>
      <div className={"flex justify-center mt-2"}>
        <NavButton title={`${t('404-btn')}`} href={`/${locale}/workshop`} />
      </div>
    </div>
  </main>
}
