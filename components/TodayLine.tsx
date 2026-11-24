"use client";

// One live line under the home headline: who sits today and when, or when the next specialist sits.
// Worked out in the visitor's browser in clinic time (CLAUDE.md rules 2 and 3). Before that, the prebuilt
// page shows the clinic's hours in the same slot (two lines reserved on phones), so nothing jumps.

import { clinic } from "@/data/clinic";
import { isDoctorOnLeave, useActiveDoctors, useDoctorStatuses } from "@/lib/appointments";
import { addDays, clinicClock, DAY_NAMES, formatTimeShort, sessionOn, weekdayOf } from "@/lib/schedule";
import { useClinicMinute } from "./useClinicMinute";

export function TodayLine({ className = "" }: { className?: string }) {
  const minute = useClinicMinute();
  const activeDoctors = useActiveDoctors();
  const statuses = useDoctorStatuses();

  let label = "Open daily";
  let text = `${formatTimeShort(clinic.hours.open)} – ${formatTimeShort(clinic.hours.close)} · lab, scans and pharmacy`;
  let live = false;

  if (minute !== null) {
    const { dateKey } = clinicClock(new Date(minute));
    const sittingsOn = (date: string, isToday = false) =>
      activeDoctors
        .filter((d) => !isDoctorOnLeave(d))
        .filter((d) => !(isToday && statuses[d.id]?.state === "cancelled"))
        .flatMap((doctor) => {
          const session = sessionOn(doctor, weekdayOf(date), date);
          return session ? [{ doctor, session }] : [];
        })
        .sort((a, b) => a.session.start.localeCompare(b.session.start));

    const today = sittingsOn(dateKey, true);
    if (today.length > 0) {
      const { doctor, session } = today[0];
      const more = today.length > 1 ? ` +${today.length - 1} more` : "";
      label = "Today";
      text = `${doctor.name ?? doctor.speciality} · ${formatTimeShort(session.start)} – ${formatTimeShort(session.end)}${more}`;
      live = true;
    } else {
      let ahead = 1;
      while (ahead < 7 && sittingsOn(addDays(dateKey, ahead)).length === 0) ahead++;
      label = "Today";
      text =
        ahead < 7
          ? `Lab, scans and pharmacy open · next specialist ${DAY_NAMES[weekdayOf(addDays(dateKey, ahead))]}`
          : text;
    }
  }

  return (
    <a
      href="#days"
      className={`group inline-flex min-h-11 max-w-full items-start sm:items-center gap-2.5 text-[15px] sm:text-lg text-ink ${className}`}
    >
      <span className={`ep-live-dot mt-[0.55em] sm:mt-0 shrink-0 ${live ? "is-live" : ""}`} aria-hidden="true" />
      <span className="min-w-0 line-clamp-2 min-h-[2lh] sm:min-h-0 sm:line-clamp-1">
        <span className="font-semibold">{label}</span>
        <span className="text-muted"> · </span>
        <span className="group-hover:underline underline-offset-4 decoration-line-strong">{text}</span>
      </span>
    </a>
  );
}
