import React, { useState } from "react";
import { SlotId } from "../types/Course";

export const DropZone: React.FC<{
  slot: SlotId;
  children?: React.ReactNode;
  onDropCourse: (id: string) => void;
  onZoneClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}> = ({ slot, children, onDropCourse, onZoneClick }) => {
  const [hover, setHover] = useState(false);
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent click if clicking on a course card or its buttons
    const target = event.target as HTMLElement;
    if (target.closest('[data-course-card]') || target.closest('button')) {
      return;
    }
    
    if (onZoneClick) {
      onZoneClick(event);
    }
  };

  return (
    <div
      className={`min-h-[120px] h-full rounded-2xl border-2 p-2 transition-all cursor-pointer relative ${
        hover ? "border-black/60 bg-black/[0.03]" : "border-black/10"
      } hover:border-blue-300 hover:bg-blue-50/30 group`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setHover(true)}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        setHover(false);
        const id = e.dataTransfer.getData("text/plain");
        if (id) onDropCourse(id);
      }}
      onClick={handleClick}
      title="Click to see available courses for this quarter"
    >
      <div className="relative h-full">
        {children}
        
        {/* Clickable area indicator - shows on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
            + Add courses
          </div>
        </div>
      </div>
    </div>
  );
};
