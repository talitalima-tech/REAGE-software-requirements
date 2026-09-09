// src/components/SidebarCard.jsx
import React from 'react';

export const SidebarCard = ({ title, children }) => (
  <div className="border-2 border-sky-200 rounded-xl p-4 bg-white relative mt-6">
    <h3 className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 font-bold text-reage-dark text-sm whitespace-nowrap">
      {title}
    </h3>
    <div className="mt-2 text-reage-dark">
      {children}
    </div>
  </div>
);