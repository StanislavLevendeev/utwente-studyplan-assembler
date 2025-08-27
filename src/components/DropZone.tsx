import React, { useState } from "react";
import { SlotId } from "../types/Course";

export const DropZone: React.FC<{
  slot: SlotId;
  children?: React.ReactNode;
  onDropCourse: (id: string) => void;
}> = ({ slot, children, onDropCourse }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`min-h-[120px] rounded-2xl border-2 p-2 transition-all ${
        hover ? "border-black/60 bg-black/[0.03]" : "border-black/10"
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setHover(true)}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        setHover(false);
        const id = e.dataTransfer.getData("text/plain");
        if (id) onDropCourse(id);
      }}
    >
      {children}
    </div>
  );
};
