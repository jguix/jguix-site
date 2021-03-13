import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { FC } from "react";

import { globals } from "../globals";

export const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="header">
      <Link href="/">
        <a href="/">{globals.siteName}</a>
      </Link>
      <div className="flex-spacer" />
      <Link href="/blog">
        <a>{t("header_blog")}</a>
      </Link>
      <Link href="/resume">
        <a>{t("header_resume")}</a>
      </Link>
      {/* <Link href="/ES" locale={false}>
        <a>ES</a>
      </Link>
      <Link href="/en" locale={false}>
        <a>EN</a>
      </Link> */}
    </div>
  );
};
