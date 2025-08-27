 import React from "react";
import { DataScienceProfile } from "../types/Course";
import { profileStyle } from "../styles/courseStyles";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedProfiles: DataScienceProfile[];
  onProfileToggle: (profile: DataScienceProfile) => void;
  onClearFilters: () => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedProfiles,
  onProfileToggle,
  onClearFilters
}) => {
  const allProfiles: DataScienceProfile[] = [
    "data-specialist",
    "smart-services", 
    "algorithms",
    "multi-disciplinary"
  ];

  const hasActiveFilters = searchTerm.length > 0 || selectedProfiles.length > 0;

  return (
    <div className="space-y-3 mb-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by course name or code..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 pl-9 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          🔍
        </div>
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Profile Filters */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
          Filter by Profile
        </label>
        <div className="flex flex-wrap gap-2">
          {allProfiles.map((profile) => {
            const isSelected = selectedProfiles.includes(profile);
            const style = profileStyle[profile];
            
            return (
              <button
                key={profile}
                onClick={() => onProfileToggle(profile)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border transition-all ${
                  isSelected 
                    ? `${style.color} ring-2 ring-offset-1 ring-gray-400` 
                    : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{style.icon}</span>
                {style.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">
            {searchTerm && `Searching: "${searchTerm}"`}
            {searchTerm && selectedProfiles.length > 0 && " • "}
            {selectedProfiles.length > 0 && `${selectedProfiles.length} profile${selectedProfiles.length > 1 ? 's' : ''} selected`}
          </span>
          <button
            onClick={onClearFilters}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
