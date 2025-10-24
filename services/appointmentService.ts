// services/appointmentService.ts
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns";
import mockData from "../data/mockData";
import type { Appointment, Doctor } from "../types";

export class AppointmentService {
  private appointments: Appointment[] = mockData.appointments;
  private doctors: Doctor[] = mockData.doctors;
  private patients = mockData.patients;

  // If you later switch to a backend, swap these to fetch calls here.
  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorById(id: string): Doctor | undefined {
    return this.doctors.find(d => d.id === id);
  }

  getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    const dayStart = startOfDay(date).getTime();
    const dayEnd = endOfDay(date).getTime();
    return this.appointments.filter(a => a.doctorId === doctorId && {
      // times might be ISO strings — coerce
    } && (() => {
      const s = new Date(a.startTime).getTime();
      const e = new Date(a.endTime).getTime();
      return s < dayEnd && e > dayStart;
    })());
  }

  getAppointmentsByDoctorAndWeek(doctorId: string, dateInWeek: Date): Appointment[] {
    const weekStart = startOfWeek(dateInWeek, { weekStartsOn: 1 }).getTime(); // Mon
    const weekEnd = endOfWeek(dateInWeek, { weekStartsOn: 1 }).getTime();
    return this.appointments.filter(a => a.doctorId === doctorId && (() => {
      const s = new Date(a.startTime).getTime();
      const e = new Date(a.endTime).getTime();
      return s < weekEnd && e > weekStart;
    })());
  }
}
