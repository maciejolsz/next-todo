import {useTranslations} from "next-intl";
import Link from "next/link";
import {Button} from "@mui/material";

export default function Page() {
  const t = useTranslations('Index');
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>{t('unauthorised')}</div>
      <Link href={"/api/auth/signin"}>
        <Button color={"secondary"} fullWidth>{t('sign-in')}</Button>
      </Link>
    </main>
  );
}
