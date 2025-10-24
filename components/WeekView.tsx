// components/WeekView.tsx
import React from "react";
import { format, addDays } from "date-fns";
import type { Appointment as TAppointment } from "../types";

type AptMeta = TAppointment & {
  slotIndexStart: number;
  slotCount: number;
  start: Date;
  end: Date;
};

type Props = {
  weekStart: Date; // Monday
  timeSlotsCount: number;
  appointments: AptMeta[];
};

const typeColor: Record<string, string> = {
  Checkup: "bg-blue-500",
  Consultation: "bg-green-500",
  "Follow-up": "bg-orange-500",
  Procedure: "bg-purple-500",
};

export function WeekView({ weekStart, timeSlotsCount, appointments }: Props) {
  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  return (
    <div className="week-view border rounded overflow-auto">
      <div className="grid" style={{ gridTemplateColumns: "80px repeat(7, 1fr)" }}>
        {/* Header row */}
        <div className="p-2 border-b" />
        {days.map((d) => (
          <div key={d.toISOString()} className="p-2 border-b text-center">
            <div className="font-semibold">{format(d, "EEE")}</div>
            <div className="text-xs">{format(d, "MMM dd")}</div>
          </div>
        ))}

        {/* Body: time column + day columns grid */}
        <div className="col-start-1 row-start-2 p-2">
          {Array.from({ length: timeSlotsCount }).map((_, i) => (
            <div key={i} className="h-8 text-xs border-b flex items-center">{/* time labels handled externally if needed */}</div>
          ))}
        </div>

        <div className="col-start-2 col-end-9 row-start-2">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(7, 1fr)`,
              gridTemplateRows: `repeat(${timeSlotsCount}, 2rem)`,
            }}
          >
            {Array.from({ length: timeSlotsCount * 7 }).map((_, idx) => (
              <div key={idx} className="h-8 border-b border-r" />
            ))}

            {appointments.map((apt: any) => {
              const dayIndex = (apt.start.getDay() + 6) % 7; // Mon=0
              const gridColumnStart = dayIndex + 1;
              const gridRowStart = apt.slotIndexStart + 1;
              const gridRowEnd = gridRowStart + apt.slotCount;
              const colorClass = typeColor[apt.type] ?? "bg-gray-400";
              return (
                <div
                  key={apt.id}
                  style={{
                    gridColumnStart,
                    gridColumnEnd: gridColumnStart + 1,
                    gridRowStart,
                    gridRowEnd,
                  }}
                  className="p-2"
                >
                  <div className={`rounded p-2 text-white text-sm ${colorClass} shadow`}>
                    <div className="font-semibold">{apt.patientName ?? apt.patientId}</div>
                    <div className="text-xs">{apt.type} · {Math.round((apt.end.getTime() - apt.start.getTime())/60000)} min</div>
                    <div className="text-xs opacity-90">{format(apt.start, "HH:mm")}</div>
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
