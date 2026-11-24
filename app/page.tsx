// Home (design v5, simplified 25 Nov 2026): four bands only. Hero (headline, live "Today" line, two
// buttons, art), "Who sits on <day>" picker, tests as one row of names, and how to find us.
// All facts come from data/clinic.ts. By-appointment doctors are listed on /doctors.

import type { Metadata } from "next";
import Link from "next/link";
import { clinic, services } from "@/data/clinic";
import { DayPicker } from "@/components/DayPicker";
import { HeroClinicalArt } from "@/components/HeroClinicalArt";
import { LegacyBookingLink } from "@/components/LegacyBookingLink";
import { ReceptionPhoto } from "@/components/ClinicPhoto";
import { TodayLine } from "@/components/TodayLine";
import { MapPinIcon, PhoneIcon, ServiceIcon } from "@/components/Icons";
import { formatTimeShort } from "@/lib/schedule";

// Every page names its own address for search engines (alternates.canonical); this is "/".
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <LegacyBookingLink />

      {/* Hero: one headline, one live line, two buttons. The art drifts slowly behind on scroll. */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 pt-10 pb-6 sm:px-8 sm:pt-16 sm:pb-12 min-[72rem]:min-h-[620px] min-[72rem]:justify-center min-[72rem]:px-10 min-[72rem]:py-20">
          <div className="relative z-10 flex min-w-0 flex-col items-start min-[72rem]:max-w-[34rem] xl:max-w-[38rem]">
            <h1 className="rise rise-1 max-w-full font-sans font-bold tracking-[-0.045em] text-ink text-[clamp(2.1rem,9.6vw,2.6rem)] leading-[1.02] sm:text-[3.6rem] min-[72rem]:text-[4.25rem] xl:text-[4.75rem]">
              Specialist doctors
              <span className="block">
                in <span className="ep-mark ep-mark-hero">Sopore</span>
              </span>
            </h1>

            <TodayLine className="rise rise-2 mt-5 sm:mt-7" />

            <div className="rise rise-3 mt-6 sm:mt-8 flex w-full flex-wrap items-center gap-2.5 sm:w-auto sm:gap-3">
              <a
                href="#days"
                className="group inline-flex min-h-12 sm:min-h-13 flex-1 sm:flex-none items-center justify-center gap-2.5 rounded-xl bg-brand px-5 sm:px-7 text-sm sm:text-base font-bold text-white hover:bg-brand-dark transition-all whitespace-nowrap"
              >
                <span>This week&rsquo;s doctors</span>
                <span className="btn-arrow inline-flex size-6 items-center justify-center rounded-full bg-white text-ink transition-transform duration-200 group-hover:translate-x-0.5">
                  <span aria-hidden="true" className="text-xs font-bold leading-none">→</span>
                </span>
              </a>
              <a
                href={`tel:${clinic.phone}`}
                className="inline-flex min-h-12 sm:min-h-13 items-center justify-center gap-2 rounded-xl border border-line-strong bg-white px-5 sm:px-6 text-sm sm:text-base font-semibold text-ink hover:border-brand hover:bg-ground transition-all whitespace-nowrap tabular-nums lining-nums"
              >
                <PhoneIcon className="size-4 shrink-0" />
                <span>
                  Call<span className="hidden sm:inline"> {clinic.phoneDisplay}</span>
                </span>
              </a>
            </div>
          </div>

          {/* Isometric clinical illustration: slow parallax (CSS scroll-driven, off under reduced motion) */}
          <div
            data-hero-art=""
            className="ep-hero-art pointer-events-none relative z-0 mx-auto flex w-full max-w-[34rem] items-center justify-center select-none min-[72rem]:absolute min-[72rem]:right-[2%] min-[72rem]:top-1/2 min-[72rem]:-translate-y-1/2 min-[72rem]:mx-0 min-[72rem]:max-w-none min-[72rem]:w-[52%]"
          >
            <div className="ep-parallax w-full">
              <HeroClinicalArt />
            </div>
          </div>
        </div>
      </section>

      <DayPicker />

      {/* Tests and medicines: names only; details live on /services */}
      <section aria-labelledby="services" className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-28">
          <div className="reveal reveal-left flex flex-wrap items-end justify-between gap-3">
            <h2 id="services" className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl">
              Tests and <em className="ep-mark">medicines</em>
            </h2>
            <Link
              href="/services"
              className="group inline-flex min-h-11 items-center gap-1.5 text-sm sm:text-base font-semibold text-ink"
            >
              <span className="underline decoration-line-strong underline-offset-4 group-hover:decoration-ink">All tests</span>
              <span aria-hidden="true" className="btn-arrow">→</span>
            </Link>
          </div>
          <ul className="reveal-group mt-6 sm:mt-10 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 lg:grid-cols-6 border-t border-line">
            {services.map((s) => (
              <li key={s.id} className="reveal border-b border-line lg:border-b-0">
                <Link
                  href={`/services#${s.id}`}
                  className="group flex min-h-16 items-center gap-3 py-3 lg:flex-col lg:items-start lg:gap-3 lg:py-6"
                >
                  <ServiceIcon id={s.id} className="size-6 shrink-0 text-accent transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span className="text-[15px] sm:text-base font-semibold leading-snug text-ink group-hover:underline underline-offset-4 decoration-line-strong">
                    {s.short}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visit: address, one button, rating line, photo */}
      <section aria-labelledby="visit" className="bg-ground border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 sm:gap-12 px-5 py-14 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div className="reveal reveal-left">
            <h2 id="visit" className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl">
              Opposite <em className="ep-mark">SDH Hospital</em>
            </h2>
            <p className="mt-4 sm:mt-6 flex items-start gap-2 text-base sm:text-lg text-ink">
              <MapPinIcon className="mt-1 size-5 shrink-0 text-ink" />
              <span>
                {clinic.address}
                <span className="block text-sm sm:text-base text-muted">
                  {clinic.location.name} building · open daily {formatTimeShort(clinic.hours.open)} – {formatTimeShort(clinic.hours.close)}
                </span>
              </span>
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={clinic.mapUrl}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-7 text-base font-bold text-white hover:bg-brand-dark"
              >
                Get directions
              </a>
              <a
                href={clinic.googleRating.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 text-sm sm:text-base text-ink tabular-nums lining-nums"
              >
                <span className="font-semibold">{clinic.googleRating.score}</span>
                <span aria-hidden="true">★</span>
                <span className="text-muted underline decoration-line-strong underline-offset-4 group-hover:decoration-ink">
                  {clinic.googleRating.count} Google reviews
                </span>
              </a>
            </div>
          </div>
          <Link href="/contact" aria-label="Map and directions" className="reveal reveal-right block">
            <span className="ep-scroll-scale block overflow-hidden rounded-3xl">
              <ReceptionPhoto className="aspect-[3/2] transition-transform duration-500 ease-out hover:scale-[1.03]" sizes="(min-width: 1024px) 560px, calc(100vw - 40px)" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
