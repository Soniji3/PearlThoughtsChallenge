// components/ScheduleView.tsx
import React, { useState } from "react";
import { startOfWeek } from "date-fns";
import { useAppointments } from "../hooks/useAppointments";
import { DoctorSelector } from "./DoctorSelector";
import { DayView } from "./DayView";
import { WeekView } from "./WeekView";

export function ScheduleView() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [view, setView] = useState<"day" | "week">("day");
  const [date, setDate] = useState(new Date());

  const {
    loading,
    error,
    appointments,
    doctors,
    selectedDoctor,
    timeSlots,
    SLOT_MINUTES,
    START_HOUR,
    END_HOUR,
  } = useAppointments(selectedDoctorId, date, view);

  const weekStart = startOfWeek(date, { weekStartsOn: 1 });

  return (
    <div className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{selectedDoctor ? `${selectedDoctor.name} — ${selectedDoctor.specialty}` : "Select a doctor"}</h2>
          <div className="text-sm text-muted">Working hours: {selectedDoctor?.workingHours ? `${selectedDoctor.workingHours.start} - ${selectedDoctor.workingHours.end}` : `${START_HOUR}:00 - ${END_HOUR}:00`}</div>
        </div>

        <div className="flex gap-3 items-center">
          <DoctorSelector doctors={doctors} value={selectedDoctorId} onChange={setSelectedDoctorId} />
          <input type="date" value={date.toISOString().slice(0,10)} onChange={(e)=>setDate(new Date(e.target.value))} className="p-2 border rounded" />
          <div>
            <button className={`px-3 py-1 rounded ${view==="day"?"bg-gray-800 text-white":"border"}`} onClick={()=>setView("day")}>Day View</button>
            <button className={`px-3 py-1 rounded ml-2 ${view==="week"?"bg-gray-800 text-white":"border"}`} onClick={()=>setView("week")}>Week View</button>
          </div>
        </div>
      </header>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !selectedDoctorId && <div className="p-4 border rounded">Please select a doctor (Front Desk) or switch to a doctor account.</div>}

      {!loading && selectedDoctorId && view === "day" && (
        <DayView date={date} timeSlots={timeSlots.map((s:any)=>s)} appointments={appointments}/>
      )}

      {!loading && selectedDoctorId && view === "week" && (
        <WeekView weekStart={weekStart} timeSlotsCount={timeSlots.length} appointments={appointments}/>
      )}
    </div>
  );
}
