// components/DoctorSelector.tsx
import React from "react";
import type { Doctor } from "../types";

type Props = {
  doctors: Doctor[];
  value: string | null;
  onChange: (id: string | null) => void;
};

export function DoctorSelector({ doctors, value, onChange }: Props) {
  return (
    <div className="doctor-selector">
      <label className="block text-sm font-medium">Doctor</label>
      <select
        className="mt-1 p-2 border rounded"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">Select doctor (Front Desk view)</option>
        {doctors.map(d => (
          <option key={d.id} value={d.id}>
            {d.name} — {d.specialty} {d.workingHours ? `(${d.workingHours.start}-${d.workingHours.end})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
