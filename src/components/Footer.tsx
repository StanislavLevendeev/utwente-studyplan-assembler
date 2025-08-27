import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-4 text-xs opacity-70">
      <div className="mb-2">
        Tip: drag a spanning course (e.g., Data Science, Research Topics, Final Project) into a quartile; it will auto-extend to a neighboring quartile in the same year. Drag a card back to the left panel to remove it.
      </div>
      <div className="text-center text-xs opacity-50 border-t pt-2 mt-2">
        Made by Stanislav Levendeev
      </div>
    </footer>
  );
};
