import React from "react";
import { Course } from "../types/Course";
import { typeStyle, profileStyle } from "../styles/courseStyles";
import { Badge } from "./Badge";

export const CourseCard: React.FC<{
  course: Course;
  draggable?: boolean;
  onDragStart?: (c: Course) => void;
  onRemove?: () => void;
  isHighlighted?: boolean;
}> = ({ course, draggable = true, onDragStart, onRemove, isHighlighted = false }) => {
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    const textToCopy = course.code || course.title;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      // You could add a toast notification here if desired
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  return (
    <div
      className={`rounded-2xl border px-3 py-2 shadow-sm cursor-grab active:cursor-grabbing select-none transition-all duration-300 ${
        isHighlighted 
          ? `${typeStyle[course.type]} ring-2 ring-blue-400 ring-opacity-75 shadow-lg transform scale-105` 
          : typeStyle[course.type]
      }`}
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", course.id);
        onDragStart?.(course);
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-medium leading-tight flex-1">
          {course.title}
          {course.code && (
            <span className="ml-2 text-xs opacity-70">({course.code})</span>
          )}
          {course.given && course.given.length > 0 && (
            <div className="text-xs opacity-70 mt-1">
              Available: Q{course.given.map(g => g.q).join(', Q')}
            </div>
          )}
          {course.profiles && course.profiles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {course.profiles.map((profile) => (
                <span key={profile} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${profileStyle[profile].color}`}>
                  <span>{profileStyle[profile].icon}</span>
                  {profileStyle[profile].label}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge>{course.ec} EC</Badge>
          {course.duration === 2 && <Badge>spans 2Q</Badge>}
          <button
            onClick={handleCopy}
            className="ml-1 text-xs px-2 py-1 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            title={`Copy ${course.code ? 'course code' : 'course name'}`}
          >
            📋
          </button>
          {onRemove && (
            <button
              className="ml-1 text-xs px-2 py-1 rounded-full bg-black/10 hover:bg-black/20"
              onClick={onRemove}
              title="Remove from quartile"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
