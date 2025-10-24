// components/DayView.tsx
import React from "react";
import { format, addMinutes } from "date-fns";
import type { Appointment as TAppointment } from "../types";

type AptMeta = TAppointment & {
  slotIndexStart: number;
  slotCount: number;
  start: Date;
  end: Date;
};

type Props = {
  date: Date;
  timeSlots: Date[] | any[]; // from useAppointments; each slot has .start/.end if using TimeSlot
  appointments: AptMeta[];
  onSelect?: (apt: AptMeta) => void;
};

const typeColor: Record<string, string> = {
  Checkup: "bg-blue-500",
  Consultation: "bg-green-500",
  "Follow-up": "bg-orange-500",
  Procedure: "bg-purple-500",
};

export function DayView({ date, timeSlots, appointments }: Props) {
  const rows = timeSlots.length;
  return (
    <div className="day-view">
      <div className="grid grid-cols-[80px_1fr]">
        {/* Time column */}
        <div className="py-2">
          {timeSlots.map((slot: any, i: number) => (
            <div key={i} className="h-8 text-xs border-b flex items-center px-2">
              {format(typeof slot.start === "function" ? slot : slot.start ? slot.start : slot, "HH:mm")}
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="relative">
          <div
            className="grid"
            style={{
              gridTemplateRows: `repeat(${rows}, 2rem)`,
            }}
          >
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="h-8 border-b" />
            ))}

            {/* Appointments absolutely positioned using CSS grid line placement */}
            {appointments.map((apt: any) => {
              const colorClass = typeColor[apt.type] ?? "bg-gray-400";
              // grid rows are 1-indexed
              const gridRowStart = apt.slotIndexStart + 1;
              const gridRowEnd = gridRowStart + apt.slotCount;
              return (
                <div
                  key={apt.id}
                  style={{
                    gridRowStart,
                    gridRowEnd,
                    position: "relative",
                    marginTop: "-2rem", // hack: because grid children rendered inside same block; alternative: place inside grid container only
                  }}
                  className={`col-start-2 col-end-3 px-2`}
                >
                  <div className={`p-2 rounded text-white text-sm ${colorClass} shadow`}>
                    <div className="font-semibold">{apt.patientName ?? apt.patientId}</div>
                    <div className="text-xs">{apt.type} · {Math.max(15, Math.round((apt.end.getTime() - apt.start.getTime())/60000))} min</div>
                    <div className="text-xs opacity-80">{format(apt.start, "HH:mm")} - {format(apt.end, "HH:mm")}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
