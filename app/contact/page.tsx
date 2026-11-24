import type { Metadata } from "next";
import { clinic } from "@/data/clinic";
import { formatTime } from "@/lib/schedule";
import { PageIntro } from "@/components/SiteChrome";
import { ClockIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { EmergencyNote } from "@/components/EmergencyNote";
import { ReceptionPhoto } from "@/components/ClinicPhoto";
import { ReportCollectionSection } from "@/components/ReportCollectionSection";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Location & Directions",
  description: `Find Eternal Polyclinic at 1st Floor, Lone Complex, Opposite SDH Hospital, Sopore. Call ${clinic.phoneDisplay} or WhatsApp ${clinic.whatsappDisplay}.`,
};

const hours = `${formatTime(clinic.hours.open)} – ${formatTime(clinic.hours.close)}`;

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Visit &amp; Contact">
        Opposite the SDH Hospital main gate in Sopore, 1st floor.
      </PageIntro>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-4">
        <EmergencyNote />
      </div>

      <section aria-label="Address and contact" className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 sm:pb-16">
        <div className="grid gap-6 sm:gap-10 card rounded-3xl p-4 sm:p-9 md:grid-cols-2">
          {/* Left: photo, address, hours, three actions */}
          <div className="flex flex-col gap-6">
            <ReceptionPhoto
              className="aspect-[3/2] rounded-2xl object-cover"
              eager
              sizes="(min-width: 1152px) 500px, (min-width: 768px) 45vw, calc(100vw - 72px)"
            />

            <div className="flex flex-col gap-4 text-base">
              <p className="flex items-start gap-3">
                <MapPinIcon className="mt-1 size-5 shrink-0 text-ink" />
                <span>
                  <strong className="block font-semibold text-ink">{clinic.name}</strong>
                  <span className="text-charcoal">{clinic.address}</span>
                </span>
              </p>
              <p className="flex items-start gap-3">
                <ClockIcon className="mt-1 size-5 shrink-0 text-ink" />
                <span className="text-charcoal">
                  Open daily, {hours}. Specialists sit on their own days (see Doctors).
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <a
                href={clinic.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-bold text-white hover:bg-brand-dark transition-colors"
              >
                <MapPinIcon className="size-4 shrink-0" />
                <span>Get directions</span>
              </a>
              <a
                href={`tel:${clinic.phone}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line-strong bg-white px-3 text-sm sm:text-base font-semibold text-ink hover:border-brand hover:bg-ground transition-colors whitespace-nowrap tabular-nums lining-nums"
              >
                <PhoneIcon className="size-4 shrink-0" />
                <span>{clinic.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line-strong bg-white px-3 text-sm sm:text-base font-semibold text-ink hover:border-brand hover:bg-ground transition-colors whitespace-nowrap tabular-nums lining-nums"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                <span>{clinic.whatsappDisplay}</span>
              </a>
            </div>
            <p className="-mt-3 text-xs text-muted">
              Call for reception and pharmacy. WhatsApp goes to the owner&rsquo;s desk.
            </p>
          </div>

          {/* Right: map */}
          <div className="relative min-h-[16rem] sm:min-h-[22rem] overflow-hidden rounded-2xl border border-line bg-ground md:min-h-[28rem]">
            <iframe
              src={clinic.mapEmbedUrl}
              title={`Map: ${clinic.name}, ${clinic.location.name}, Sopore`}
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>

        {/* Lab reports on WhatsApp (also the lab's direct line) */}
        <ReportCollectionSection className="reveal mt-8" />
      </section>
    </>
  );
}
