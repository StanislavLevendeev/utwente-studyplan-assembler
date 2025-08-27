import React from "react";
import { typeStyle, profileStyle } from "../styles/courseStyles";

export const Legend: React.FC = () => {
  return (
    <section className="rounded-2xl border bg-white shadow-sm p-4 flex-shrink-0 space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Course Types</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className={`px-2 py-1 rounded-full border ${typeStyle.required}`}>Required</span>
          <span className={`px-2 py-1 rounded-full border ${typeStyle.advanced}`}>Advanced</span>
          <span className={`px-2 py-1 rounded-full border ${typeStyle.elective}`}>Elective</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Data Science Profiles</h3>
        <div className="space-y-1 text-xs">
          {Object.entries(profileStyle).map(([key, value]) => {
            if (key === "general") return null; // Don't show general profile in legend
            return (
              <div key={key} className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border ${value.color}`}>
                  <span>{value.icon}</span>
                  {value.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
