// hooks/useAppointments.ts
import { useEffect, useMemo, useState } from "react";
import { addMinutes, startOfDay, setHours, setMinutes, isSameDay } from "date-fns";
import type { Appointment, Doctor } from "../types";
import { AppointmentService } from "../services/appointmentService";
import { TimeSlot } from "../domain/TimeSlot";

const SLOT_MINUTES = 30;
const START_HOUR = 8;
const END_HOUR = 18;

export function generateTimeSlots(date: Date) {
  const slots: TimeSlot[] = [];
  for (let h = START_HOUR; h < END_HOUR; h++) {
    for (let m of [0, 30]) {
      const start = setMinutes(setHours(startOfDay(date), h), m);
      const end = addMinutes(start, SLOT_MINUTES);
      slots.push(new TimeSlot(start, end));
    }
  }
  return slots;
}

export function useAppointments(doctorId: string | null, date: Date, view: "day" | "week") {
  const svc = useMemo(() => new AppointmentService(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const doctors = svc.getDoctors();
  const selectedDoctor = doctorId ? svc.getDoctorById(doctorId) ?? null : null;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    try {
      const data = view === "day"
        ? (doctorId ? svc.getAppointmentsByDoctorAndDate(doctorId, date) : [])
        : (doctorId ? svc.getAppointmentsByDoctorAndWeek(doctorId, date) : []);

      if (!mounted) return;
      setAppointments(data);
    } catch (err) {
      setError((err as Error).message || "Failed to load");
      setAppointments([]);
    } finally {
      if (mounted) setLoading(false);
    }
    return () => { mounted = false; };
  }, [doctorId, date, view, svc]);

  const timeSlots = useMemo(() => generateTimeSlots(date), [date]);

  // map appointments to display-friendly structures
  const appointmentsWithMeta = useMemo(() => {
    return appointments.map(a => {
      const start = new Date(a.startTime);
      const end = new Date(a.endTime);
      // calculate slot indices for grid placement
      const dayStart = setMinutes(setHours(startOfDay(date), START_HOUR), 0).getTime();
      const slotIndexStart = Math.max(0, Math.floor((start.getTime() - dayStart) / (SLOT_MINUTES * 60000)));
      const slotIndexEnd = Math.max(slotIndexStart + 1, Math.ceil((end.getTime() - dayStart) / (SLOT_MINUTES * 60000)));
      const slotCount = slotIndexEnd - slotIndexStart;
      return { ...a, start, end, slotIndexStart, slotCount };
    });
  }, [appointments, date]);

  return {
    loading,
    error,
    appointments: appointmentsWithMeta,
    doctors,
    selectedDoctor,
    timeSlots,
    SLOT_MINUTES,
    START_HOUR,
    END_HOUR,
  };
}
w