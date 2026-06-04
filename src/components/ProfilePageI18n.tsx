"use client";

import Link from "next/link";
import { useI18n } from "./I18nProvider";

export function ProfileBreadcrumbs({
  categorySlug,
  categoryName,
  proName,
}: {
  categorySlug: string;
  categoryName: string;
  proName: string;
}) {
  const { t, cat } = useI18n();
  return (
    <div className="breadcrumbs">
      <Link href="/">{t("common.home")}</Link>
      <span>›</span>
      <Link href={`/buscar?categoria=${categorySlug}`}>{cat(categorySlug, categoryName)}</Link>
      <span>›</span>
      <span className="breadcrumb-current">{proName}</span>
    </div>
  );
}

export function ProfileBadges({
  isFounder,
  isVerified,
  is24h,
  isDomiciliar,
}: {
  isFounder: boolean;
  isVerified: boolean;
  is24h: boolean;
  isDomiciliar: boolean;
}) {
  const { t } = useI18n();
  return (
    <>
      {isFounder && <span className="badge badge-founder">⭐ {t("pro.founder2026")}</span>}
      {isVerified && <span className="badge badge-verified">✓ {t("pro.verified")}</span>}
      {is24h && <span className="badge badge-24h">24h</span>}
      {isDomiciliar && <span className="badge badge-domiciliar">{t("pro.domiciliar")}</span>}
    </>
  );
}

export function useProfileT() {
  const { t } = useI18n();
  return {
    reviewsCount: (n: number) => t("profile.reviewsCount", { n }),
    yearsExp: (n: number) => t("profile.yearsExp", { n }),
    callWhatsapp: t("profile.callWhatsapp"),
    contactDirect: t("profile.contactDirect"),
    firstReview: (name: string) => t("profile.firstReview", { name }),
    responded: (name: string) => t("profile.responded", { name }),
    responseTime: t("profile.responseTime"),
    responseMinutes: t("profile.responseMinutes"),
    responseHours: t("profile.responseHours"),
    workPhoto: (n: number) => t("profile.workPhoto", { n }),
    clientReviews: t("profile.clientReviews"),
    about: t("profile.about"),
    specialties: t("profile.specialties"),
    gallery: t("profile.gallery"),
  };
}
