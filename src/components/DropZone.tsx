import React, { useState } from "react";
import { SlotId } from "../types/Course";

export const DropZone: React.FC<{
  slot: SlotId;
  children?: React.ReactNode;
  onDropCourse: (id: string) => void;
  onZoneClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  isFull?: boolean;
}> = ({ slot, children, onDropCourse, onZoneClick, isFull = false }) => {
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
      className={`min-h-[120px] h-full rounded-2xl border-2 p-2 transition-all relative ${
        hover ? "border-black/60 bg-black/[0.03]" : "border-black/10"
      } ${!isFull ? "cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 group" : "cursor-default"}`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setHover(true)}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        setHover(false);
        const id = e.dataTransfer.getData("text/plain");
        if (id) onDropCourse(id);
      }}
      onClick={!isFull ? handleClick : undefined}
      title={!isFull ? "Click to see available courses for this quarter" : "Quarter is full (15 EC)"}
    >
      <div className="relative h-full">
        {children}
        
        {/* Clickable area indicator - shows on hover only if not full */}
        {!isFull && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
              + Add courses
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
