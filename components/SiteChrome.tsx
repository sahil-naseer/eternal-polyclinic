// Footer and quick-action buttons shared by every page (see app/layout.tsx).

import Link from "next/link";
import { clinic } from "@/data/clinic";
import { formatTime } from "@/lib/schedule";
import { Logo } from "./Logo";
import { NAV } from "./nav";
import { TabBar } from "./TabBar";

export function SiteFooter() {
  const hours = `${formatTime(clinic.hours.open)} – ${formatTime(clinic.hours.close)}`;
  const label = "mb-2 font-sans text-[13px] font-semibold tracking-normal text-ink";
  const link = "inline-flex min-h-10 items-center gap-x-1 text-[13px] sm:text-sm text-muted hover:text-ink hover:underline underline-offset-4";
  return (
    <footer className="border-t border-line bg-ground pb-24 pt-10 text-ink sm:pt-14 lg:pb-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-6 px-5 sm:gap-x-8 sm:gap-y-10 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col gap-3 lg:col-span-1">
          <Link href="/" className="flex min-h-11 items-center gap-3">
            <Logo className="size-9 shrink-0" />
            <span className="font-display text-lg font-semibold tracking-tight">{clinic.name}</span>
          </Link>
          <p className="max-w-sm text-[13px] sm:text-sm leading-relaxed text-muted">
            {clinic.address}
            <br />
            {clinic.location.name} building, Sopore, Kashmir
          </p>
          <p className="text-[13px] sm:text-sm text-muted">
            Founder: <span className="font-semibold text-ink">{clinic.founder}</span>
          </p>
        </div>

        <div>
          <h2 className={label}>Hours</h2>
          <p className="text-sm font-semibold">
            Daily <span className="whitespace-nowrap">{hours}</span>
          </p>
          <p className="mt-1 text-[13px] sm:text-sm leading-relaxed text-muted">
            Visiting specialists sit on fixed days. See who&rsquo;s in on the home page.
          </p>
        </div>

        <nav aria-label="Footer" className="order-last col-span-2 sm:order-none sm:col-span-1">
          <h2 className={label}>Pages</h2>
          <ul className="flex flex-wrap gap-x-5 sm:flex-col">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={label}>Contact</h2>
          <ul>
            <li>
              <a href={`tel:${clinic.phone}`} className={link}>
                Call <span className="whitespace-nowrap font-semibold text-ink">{clinic.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${clinic.whatsapp}`} className={link}>
                WhatsApp <span className="whitespace-nowrap font-semibold text-ink">{clinic.whatsappDisplay}</span>
              </a>
            </li>
            <li>
              <a href={clinic.mapUrl} className={`${link} font-semibold !text-accent`}>
                Directions ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 sm:mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-x-6 border-t border-line-strong/70 px-5 pt-5 text-[13px] text-muted sm:px-6">
        <p className="py-1">
          &copy; {new Date().getFullYear()} {clinic.name}, Sopore. Not an emergency service: go to SDH Hospital opposite
          (open 24 hours) or call{" "}
          <a href={`tel:${clinic.emergency.phone}`} className="font-semibold text-ink underline">
            {clinic.emergency.phone}
          </a>
          .
        </p>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className="inline-flex min-h-10 items-center hover:text-ink">
            Privacy notice
          </Link>
          <Link href="/admin" className="inline-flex min-h-10 items-center text-muted hover:text-ink">
            Staff
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function QuickActions() {
  // Phones and tablets: bottom tab bar. Wide screens use the header's WhatsApp button (no floating button).
  return <TabBar />;
}

/** Title block at the top of inner pages. */
export function PageIntro({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className ?? "mx-auto max-w-6xl px-5 pt-8 pb-4 sm:pt-20 sm:pb-8 sm:px-6"}>
      <h1 className="rise ep-display-sm text-ink">
        {title}
      </h1>
      {children && (
        <div className="rise rise-1 mt-3 max-w-2xl text-muted sm:mt-4 sm:text-xl leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
