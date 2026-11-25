"use client";

// Header on every page (design v6, 26 Nov 2026): a slim frosted bar, 52px tall. Logo left, small quiet page links in
// the middle (wide screens), Call and WhatsApp right. Phones and tablets: logo, Call and WhatsApp; the menu lives in
// the bottom tab bar (TabBar.tsx). Above it, a thin strip with the clinic's hours (AnnouncementStrip, not sticky).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clinic } from "@/data/clinic";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { Logo } from "./Logo";
import { NAV } from "./nav";
import { formatTimeShort } from "@/lib/schedule";

/** Thin grey strip above the header: the clinic's daily hours and a link to this week's doctors. Scrolls away. */
export function AnnouncementStrip() {
  return (
    <aside aria-label="Opening hours" className="bg-ground text-center text-[13px] leading-snug text-charcoal sm:text-sm">
      <p className="mx-auto max-w-6xl px-4 py-2.5">
        Open daily {formatTimeShort(clinic.hours.open)} – {formatTimeShort(clinic.hours.close)}<span className="hidden sm:inline"> · lab, scans and pharmacy</span>.{" "}
        <Link href="/#days" className="whitespace-nowrap font-semibold text-accent underline-offset-4 hover:underline">
          See who&rsquo;s in <span aria-hidden="true">›</span>
        </Link>
      </p>
    </aside>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 [view-transition-name:site-header] border-b border-black/[0.08] frosted text-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 sm:gap-4 px-3 min-[375px]:px-3.5 py-1 sm:px-6 lg:min-h-[3.25rem]">
        <Link href="/" className="group flex min-h-11 items-center gap-2 sm:gap-3 min-w-0">
          <Logo className="size-8 sm:size-9 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-[15px] min-[375px]:text-base font-semibold tracking-tight group-hover:text-brand">
              {clinic.name}
            </span>
            <span className="hidden min-[360px]:block truncate text-[11px] font-medium text-muted">
              Sopore, Kashmir
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 text-[13px] font-medium lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || Boolean(pathname?.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`inline-flex min-h-11 items-center px-3.5 transition-colors ${
                  active ? "text-ink font-semibold" : "text-charcoal hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={`tel:${clinic.phone}`}
            aria-label={`Call the clinic, ${clinic.phoneDisplay}`}
            className="ml-3 inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3 text-ink hover:bg-ground tabular-nums lining-nums whitespace-nowrap shrink-0 transition-colors"
          >
            <PhoneIcon className="size-4 shrink-0" />
            <span className="hidden xl:inline">{clinic.phoneDisplay}</span>
          </a>
          <a
            href={`https://wa.me/${clinic.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-brand px-4 font-semibold text-white hover:bg-brand-dark whitespace-nowrap shrink-0 transition-colors"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            <span>WhatsApp</span>
          </a>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 lg:hidden">
          <a
            href={`tel:${clinic.phone}`}
            aria-label={`Call the clinic, ${clinic.phoneDisplay}`}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-line-strong bg-white px-3 text-sm font-semibold text-ink tabular-nums lining-nums hover:bg-ground"
          >
            <PhoneIcon className="size-4 shrink-0" />
            <span className="hidden sm:inline">{clinic.phoneDisplay}</span>
          </a>
          <a
            href={`https://wa.me/${clinic.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message clinic on WhatsApp ${clinic.whatsappDisplay}`}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-brand px-3.5 text-sm font-semibold text-white hover:bg-brand-dark whitespace-nowrap shrink-0 transition-colors"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
