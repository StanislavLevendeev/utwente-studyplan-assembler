import React from "react";
import { CatalogDropdown } from "./CatalogDropdown";
import { ExportDropdown } from "./ExportDropdown";
import { SlotId, Course } from "../types/Course";
import { initialAssignments } from "../utils/initialState";

interface HeaderProps {
  notice: string | null;
  assignments: Record<string, SlotId[]>;
  courses: Course[];
  ecMap: Record<SlotId, number>;
  setAssignments: (assignments: Record<string, SlotId[]>) => void;
  setNotice: (notice: string | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  notice,
  assignments,
  courses,
  ecMap,
  setAssignments,
  setNotice
}) => {
  const resetToDefault = () => {
    if (confirm('Are you sure you want to reset to the default study plan? This will clear your current progress.')) {
      const defaultAssignments = initialAssignments();
      setAssignments(defaultAssignments);
      setNotice('Study plan reset to default.');
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const clearAllCourses = () => {
    if (confirm('Are you sure you want to clear all course assignments? This will move all courses back to unassigned.')) {
      setAssignments({});
      setNotice('All courses cleared.');
      setTimeout(() => setNotice(null), 3000);
    }
  };

  return (
    <header className="mb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">UTwente – Data Science & Technology Study Planner</h1>
          <p className="text-sm opacity-80 mt-1">Drag courses into quartiles (max 15 EC per quartile). Double-span courses will occupy two adjacent quartiles in the same year.</p>
          <div className="mt-3">
            <CatalogDropdown />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetToDefault}
            className="px-3 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium shadow-sm text-sm"
            title="Reset to default study plan"
          >
            Reset
          </button>
          <button
            onClick={clearAllCourses}
            className="px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-sm text-sm"
            title="Clear all course assignments"
          >
            Clear All
          </button>
          <ExportDropdown 
            assignments={assignments}
            courses={courses}
            ecMap={ecMap}
          />
        </div>
      </div>
      {notice && (
        <div className="mt-3 rounded-xl bg-red-50 border border-red-200 text-red-900 p-3 text-sm">
          {notice}
        </div>
      )}
    </header>
  );
};
