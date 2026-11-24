import type { Metadata } from "next";
import { Suspense } from "react";
import { clinic } from "@/data/clinic";
import { DoctorDirectory } from "@/components/DoctorDirectory";
import { DirectoryFromLink } from "@/components/DirectoryFromLink";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { PageIntro } from "@/components/SiteChrome";

export const metadata: Metadata = {
  alternates: { canonical: "/doctors" },
  title: "Our doctors and OPD schedule",
  description: `Specialists at ${clinic.name}, Sopore, the days they sit, and how to book online. Serving Baramulla, Bandipora, Kupwara and North Kashmir.`,
};

export default function DoctorsPage() {
  return (
    <>
      <PageIntro title="Our doctors">
        Find a specialist and the days they sit.
      </PageIntro>

      <section aria-labelledby="all-doctors" className="mx-auto max-w-6xl px-5 pb-6">
        <h2 id="all-doctors" className="sr-only">
          All doctors
        </h2>
        <Suspense fallback={<DoctorDirectory />}>
          <DirectoryFromLink />
        </Suspense>
        <p className="mt-5 text-muted sm:mt-6">
          More specialists visit every week. Not sure who to see?{" "}
          <a href={`tel:${clinic.phone}`} className="font-semibold text-brand underline">
            Call <span className="whitespace-nowrap">{clinic.phoneDisplay}</span>
          </a>{" "}
          and reception will guide you.
        </p>
      </section>

      {/* Weekly timetable, folded by default to keep the page short (native <details>: no JS, keyboard friendly) */}
      <section aria-label="Weekly OPD schedule" className="reveal mx-auto max-w-6xl scroll-mt-24 px-5 pb-24 pt-6 sm:pb-16 sm:pt-8">
        <details id="schedule" className="group">
          <summary className="ep-pill inline-flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-xl border border-line-strong bg-white px-5 text-sm sm:text-base font-semibold text-ink hover:border-brand hover:bg-ground transition-colors [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Show weekly timetable</span>
            <span className="hidden group-open:inline">Hide weekly timetable</span>
            <span aria-hidden="true" className="transition-transform duration-200 group-open:rotate-180">↓</span>
          </summary>
          <div className="mt-5 sm:mt-6">
            <p className="mb-4 text-muted sm:mb-6">Timings can change on holidays, so call if you&apos;re unsure.</p>
            <WeeklySchedule />
          </div>
        </details>
      </section>
    </>
  );
}
