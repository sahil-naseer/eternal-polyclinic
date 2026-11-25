// Home (design v6 "Bands", 26 Nov 2026): full-width bands, one message each, centred type and big pictures,
// alternating light and dark. Hero (headline, live "Today" line, two buttons, art) → "Who sits on <day>" picker
// (grey) → tests and medicines (black) → how to find us (white, big photo). Every fact comes from data/clinic.ts.
// By-appointment doctors are listed on /doctors.

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

const primaryBtn =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 sm:px-7 text-[15px] sm:text-base font-semibold text-white hover:bg-brand-dark whitespace-nowrap";
const secondaryBtn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-ink px-6 sm:px-7 text-[15px] sm:text-base font-semibold text-ink hover:bg-ink hover:text-white whitespace-nowrap tabular-nums lining-nums";

export default function Home() {
  return (
    <>
      <LegacyBookingLink />

      {/* Hero: centred headline, one live line, two buttons, then the drawing large underneath. */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pt-12 text-center sm:px-8 sm:pt-20 lg:pt-24">
          <h1 className="rise rise-1 ep-display max-w-full text-ink">
            Specialist doctors{" "}
            <span className="whitespace-nowrap">
              in <span className="ep-mark ep-mark-hero">Sopore</span>
            </span>
          </h1>

          <TodayLine className="rise rise-2 mt-5 sm:mt-6 justify-center text-left sm:text-center" />

          <div className="rise rise-3 mt-7 sm:mt-9 flex w-full flex-col items-stretch gap-3 min-[420px]:w-auto min-[420px]:flex-row min-[420px]:items-center">
            <a href="#days" className={primaryBtn}>
              <span>This week&rsquo;s doctors</span>
              <span aria-hidden="true" className="btn-arrow">→</span>
            </a>
            <a href={`tel:${clinic.phone}`} className={secondaryBtn}>
              <PhoneIcon className="size-4 shrink-0" />
              <span>Call {clinic.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* The clinical drawing, big and centred; it settles in once and drifts slowly as the page scrolls. */}
        <div
          data-hero-art=""
          className="ep-hero-art pointer-events-none mx-auto mt-6 w-full max-w-[24rem] px-5 pb-10 select-none sm:mt-10 sm:max-w-3xl sm:pb-16 lg:max-w-4xl lg:pb-20"
        >
          <div className="ep-parallax w-full">
            <HeroClinicalArt />
          </div>
        </div>
      </section>

      <DayPicker />

      {/* Tests and medicines, on black: names only; details live on /services. */}
      <section aria-labelledby="services" className="ep-on-dark bg-night text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-6 sm:py-28 lg:py-32">
          <div className="reveal">
            <h2 id="services" className="ep-headline text-white">
              Tests and <em className="ep-mark">medicines</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-night-muted sm:mt-5 sm:text-xl">
              No need to go elsewhere for scans, reports or medicines.
            </p>
            <div className="mt-7 flex justify-center sm:mt-9">
              <Link
                href="/services"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-[15px] sm:text-base font-semibold text-ink hover:bg-sand"
              >
                <span>All tests</span>
                <span aria-hidden="true" className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
          <ul className="reveal-group mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {services.map((s) => (
              <li key={s.id} className="reveal reveal-scale">
                <Link
                  href={`/services#${s.id}`}
                  className="ep-tile group flex h-full min-h-28 flex-col items-center justify-center gap-3 rounded-3xl bg-[#161617] px-3 py-6 sm:min-h-36"
                >
                  <ServiceIcon
                    id={s.id}
                    className="size-7 shrink-0 text-mint transition-transform duration-300 group-hover:-translate-y-0.5 sm:size-8"
                  />
                  <span className="text-[15px] font-semibold leading-snug text-white sm:text-base">{s.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visit: centred address and buttons, then the clinic's own photo, big. */}
      <section aria-labelledby="visit" className="bg-white">
        <div className="mx-auto max-w-5xl px-5 pt-16 text-center sm:px-6 sm:pt-28 lg:pt-32">
          <div className="reveal">
            <h2 id="visit" className="ep-headline text-ink">
              Opposite <em className="ep-mark">SDH Hospital</em>
            </h2>
            <p className="mx-auto mt-4 flex max-w-xl items-start justify-center gap-2 text-left text-base text-ink sm:mt-5 sm:text-center sm:text-xl">
              <MapPinIcon className="mt-1 size-5 shrink-0 text-ink" />
              <span>
                {clinic.address}
                <span className="block text-sm text-muted sm:text-base">
                  {clinic.location.name} building · open daily {formatTimeShort(clinic.hours.open)} – {formatTimeShort(clinic.hours.close)}
                </span>
              </span>
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:mt-9">
              <a href={clinic.mapUrl} className={primaryBtn}>
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
        </div>
        <div className="mx-auto max-w-5xl px-5 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-28 lg:pb-32">
          <Link href="/contact" aria-label="Map and directions" className="block">
            <span className="ep-scroll-scale block overflow-hidden rounded-3xl">
              <ReceptionPhoto
                className="aspect-[3/2] transition-transform duration-700 ease-out hover:scale-[1.02]"
                sizes="(min-width: 1024px) 960px, calc(100vw - 40px)"
              />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
