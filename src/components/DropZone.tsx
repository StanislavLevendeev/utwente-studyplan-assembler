import React, { useState } from "react";
import { SlotId } from "../types/Course";

export const DropZone: React.FC<{
  slot: SlotId;
  children?: React.ReactNode;
  onDropCourse: (id: string) => void;
  isFull?: boolean;
}> = ({ slot, children, onDropCourse, isFull = false }) => {
  const [hover, setHover] = useState(false);
  const [dragValid, setDragValid] = useState(true);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    // Check if the slot is full to determine if drop is valid
    const isValid = !isFull;
    setDragValid(isValid);
    if(!hover) {
      // If hovering over the drop zone, show visual feedback
      setHover(true);
    }
  };

  const handleDragEnter = () => {
    setHover(true);
    setDragValid(!isFull);
  };

  const handleDragLeave = () => {
    setHover(false);
    setDragValid(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    setHover(false);
    setDragValid(true);
    const id = e.dataTransfer.getData("text/plain");
    if (id && !isFull) {
      onDropCourse(id);
    }
  };

  return (
    <div
      className={`min-h-[120px] h-full rounded-2xl border-2 p-2 transition-all ${
        hover 
          ? dragValid 
            ? "border-green-400 bg-green-50/50" 
            : "border-red-400 bg-red-50/50" 
          : "border-black/10"
      }`}
      style={{ 
        cursor: hover ? (dragValid ? "copy" : "not-allowed") : "default" 
      }}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`relative h-full ${hover ? "pointer-events-none" : "pointer-events-auto"}`}>
        <div className="">
          {children}
        </div>
        
        {/* Drop feedback indicator */}
        {hover && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
              dragValid 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-red-100 text-red-800 border border-red-200"
            }`}>
              {dragValid ? "Drop here" : "Quarter is full"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
