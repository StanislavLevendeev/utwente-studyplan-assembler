import React from "react";

export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="px-2 py-0.5 rounded-full bg-black/5 text-xs">{children}</span>
);
