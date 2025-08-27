import React from "react";
import { Course, SlotId, DataScienceProfile } from "../types/Course";
import { typeStyle } from "../styles/courseStyles";
import { CourseCard } from "./CourseCard";
import { SearchAndFilter } from "./SearchAndFilter";
import { motion, AnimatePresence } from "framer-motion";
import { unassign } from "../utils/plannerUtils";

interface UnassignedCoursesProps {
  unassigned: Course[];
  highlightedSlot: SlotId | null;
  assignments: Record<string, SlotId[]>;
  setAssignments: (assignments: Record<string, SlotId[]>) => void;
  isHighlightedForSlot: (course: Course, slot: SlotId | null) => boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedProfiles: DataScienceProfile[];
  onProfileToggle: (profile: DataScienceProfile) => void;
  onClearFilters: () => void;
}

export const UnassignedCourses: React.FC<UnassignedCoursesProps> = ({
  unassigned,
  highlightedSlot,
  assignments,
  setAssignments,
  isHighlightedForSlot,
  searchTerm,
  onSearchChange,
  selectedProfiles,
  onProfileToggle,
  onClearFilters
}) => {
  return (
    <section className="rounded-2xl border bg-white shadow-sm p-4 flex-1 flex flex-col min-h-0">
      <h2 className="text-lg font-semibold mb-3">Unassigned courses</h2>
      
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedProfiles={selectedProfiles}
        onProfileToggle={onProfileToggle}
        onClearFilters={onClearFilters}
      />
      
      <div
        className="rounded-xl border border-dashed p-3 flex-1 overflow-y-auto max-h-[60vh]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const id = e.dataTransfer.getData("text/plain");
          if (!id) return;
          setAssignments(unassign(id, assignments));
        }}
      >
        <div className="space-y-2">
          {unassigned.length === 0 && (
            <div className="text-sm opacity-60">
              {searchTerm || selectedProfiles.length > 0 
                ? "No courses match your filters. Try clearing filters or adjusting your search."
                : "All courses are placed. Drag any card here to unassign it."
              }
            </div>
          )}
          <AnimatePresence>
            {unassigned.map((c) => (
              <motion.div 
                key={c.id} 
                layout 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -8 }}
              >
                <CourseCard 
                  course={c} 
                  isHighlighted={isHighlightedForSlot(c, highlightedSlot)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
