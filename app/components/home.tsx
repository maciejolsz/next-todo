import Link from "next/link";

import { Button } from "@mui/material";
import { auth } from "@/auth";
import {getLocale, getTranslations} from "next-intl/server";

const Home = async () => {
  const session = await auth();
  const locale = await getLocale();
  const t = await getTranslations();

  return <div>
    {!session?.user &&
      <div>
        <div className={"mb-4"}>{t('Index.where-home')} <code>{t('Index.home')}?</code></div>
        <Link href={"/api/auth/signin"}>
          <Button color={"secondary"} fullWidth>{t('Index.sign-in')}</Button>
        </Link>
      </div>
    }
    {session?.user &&
      <div>
        <div>{t('Index.welcome')} <code>{t('Index.home')}</code>, {session.user.name}</div>
        <Link href={`/${locale}/workshop`}>
          <Button color={"primary"} fullWidth>{t('Index.work')}</Button>
        </Link>
        <Link href={"/api/auth/signout"}>
          <Button color={"secondary"} fullWidth>{t('Index.sign-out')}</Button>
        </Link>
      </div>
    }
  </div>;
}

export default Home;
