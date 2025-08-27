import React, { useState, useEffect } from "react";

export const CatalogDropdown: React.FC = () => {
  const [showCatalogDropdown, setShowCatalogDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCatalogDropdown) {
        const target = event.target as HTMLElement;
        if (!target.closest('.relative')) {
          setShowCatalogDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCatalogDropdown]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowCatalogDropdown(!showCatalogDropdown)}
        className="inline-flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium shadow-sm text-sm"
        title="View course information"
      >
        📚 Course Information
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {showCatalogDropdown && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
          <div className="py-2">
            <a
              href="https://utwente.osiris-student.nl/onderwijscatalogus/extern/cursus"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setShowCatalogDropdown(false)}
            >
              <div className="font-medium flex items-center gap-2">
                📚 Osiris Course Catalog
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <div className="text-xs text-gray-500">Detailed course information & schedules</div>
            </a>
            <a
              href="https://www.utwente.nl/en/cs/programme/specialisations/data-science/#advanced-courses-dst"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setShowCatalogDropdown(false)}
            >
              <div className="font-medium flex items-center gap-2">
                🎓 DST Specialization Page
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <div className="text-xs text-gray-500">Official DST advanced courses overview</div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
