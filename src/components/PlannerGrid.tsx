import React from "react";
import { Course, SlotId, slotLabel } from "../types/Course";
import { DropZone } from "./DropZone";
import { CourseCard } from "./CourseCard";
import { motion, AnimatePresence } from "framer-motion";

interface PlannerGridProps {
  courses: Course[];
  assignments: Record<string, SlotId[]>;
  ecMap: Record<SlotId, number>;
  handleDrop: (slot: SlotId, courseId: string) => void;
  removeFromSlot: (courseId: string) => void;
  handleQuartileClick: (slot: SlotId) => void;
}

export const PlannerGrid: React.FC<PlannerGridProps> = ({
  courses,
  assignments,
  ecMap,
  handleDrop,
  removeFromSlot,
  handleQuartileClick
}) => {
  return (
    <main className="col-span-12 lg:col-span-8">
      {[1, 2].map((year) => (
        <section key={year} className="mb-8">
          <h2 className="text-xl font-bold mb-3">Year {year}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((q) => {
              const slot = `${year}Y-Q${q}` as SlotId;
              const coursesHere = courses.filter((c) => assignments[c.id]?.includes(slot));
              const ec = ecMap[slot];
              return (
                <div key={slot} className="rounded-2xl bg-white shadow-sm border p-3">
                  <div 
                    className="flex items-center justify-between mb-2 cursor-pointer hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors"
                    onClick={() => handleQuartileClick(slot)}
                    title="Click to highlight compatible courses"
                  >
                    <div className="font-semibold">Q{q}</div>
                    <div className={`text-sm px-2 py-0.5 rounded-full ${ec > 15 ? "bg-red-100 text-red-800" : ec === 15 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}`}>
                      {ec}/15 EC
                    </div>
                  </div>
                  <DropZone slot={slot} onDropCourse={(id) => handleDrop(slot, id)}>
                    <div className="space-y-2">
                      <AnimatePresence>
                        {coursesHere.map((c) => (
                          <motion.div 
                            key={`${slot}-${c.id}`} 
                            layout 
                            initial={{ opacity: 0, y: 6 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -6 }}
                          >
                            <CourseCard 
                              course={c} 
                              onRemove={() => removeFromSlot(c.id)}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </DropZone>
                  <div className="mt-2 text-xs text-slate-500">{slotLabel(slot)}</div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
};
