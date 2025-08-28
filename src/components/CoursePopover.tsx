import React from "react";
import { Course, SlotId } from "../types/Course";
import { CourseCard } from "./CourseCard";
import { motion, AnimatePresence } from "framer-motion";

interface CoursePopupProps {
  isOpen: boolean;
  onClose: () => void;
  slot: SlotId;
  applicableCourses: Course[];
  onCourseSelect: (courseId: string) => void;
}

export const CoursePopover: React.FC<CoursePopupProps> = ({
  isOpen,
  onClose,
  slot,
  applicableCourses,
  onCourseSelect
}) => {
  if (!isOpen) return null;

  const handleCourseClick = (courseId: string) => {
    onCourseSelect(courseId);
    onClose();
  };

  const [year, quarter] = slot.split('-Q');
  const quarterNum = quarter;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Popup Modal */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden w-full max-w-2xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Available Courses
                  </h3>
                  <p className="text-sm text-gray-600">
                    Year {year.charAt(0)}, Quarter {quarterNum}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Close popup"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {applicableCourses.length === 0 ? (
                <div className="flex items-center justify-center h-full py-12 text-gray-500">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">No applicable courses found</p>
                    <p className="text-sm text-gray-400 mt-2">
                      All eligible courses may already be assigned
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-3 overflow-y-auto max-h-96">
                  {applicableCourses.map((course) => (
                    <div
                      key={course.id}
                      className="cursor-pointer transform transition-all hover:scale-[1.02] hover:shadow-md hover:ring-2 hover:ring-blue-200 rounded-2xl"
                      onClick={() => handleCourseClick(course.id)}
                    >
                      <CourseCard 
                        course={course} 
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer tip */}
            {applicableCourses.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-sm text-gray-600 text-center">
                  Click on a course to add it to this quarter
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
