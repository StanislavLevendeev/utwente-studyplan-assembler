import React, { useState, useEffect } from "react";
import { exportStudyProgramme, exportAsText } from "../utils/plannerUtils";
import { SlotId, Course } from "../types/Course";

interface ExportDropdownProps {
  assignments: Record<string, SlotId[]>;
  courses: Course[];
  ecMap: Record<SlotId, number>;
}

export const ExportDropdown: React.FC<ExportDropdownProps> = ({ 
  assignments, 
  courses, 
  ecMap 
}) => {
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showExportDropdown) {
        const target = event.target as HTMLElement;
        if (!target.closest('.relative')) {
          setShowExportDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportDropdown]);

  const handleExportFormat = (format: 'json' | 'txt') => {
    setShowExportDropdown(false);
    if (format === 'json') {
      exportStudyProgramme(assignments, courses, ecMap);
    } else {
      exportAsText(assignments, courses, ecMap);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowExportDropdown(!showExportDropdown)}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm flex items-center gap-2"
        title="Export your study plan"
      >
        Export Plan
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {showExportDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
          <div className="py-2">
            <button
              onClick={() => handleExportFormat('txt')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">Export as Text</div>
              <div className="text-xs text-gray-500">Well-formatted .txt file</div>
            </button>
            <button
              onClick={() => handleExportFormat('json')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">Export as JSON</div>
              <div className="text-xs text-gray-500">Structured data file</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
