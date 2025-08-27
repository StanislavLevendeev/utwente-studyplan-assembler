import { CourseType, DataScienceProfile } from '../types/Course';

// ---- UI helpers ----
export const typeStyle: Record<CourseType, string> = {
  required: "bg-blue-50 border-blue-300 text-blue-900",
  advanced: "bg-amber-50 border-amber-300 text-amber-900",
  elective: "bg-emerald-50 border-emerald-300 text-emerald-900",
};

export const profileStyle: Record<DataScienceProfile, { color: string; icon: string; label: string }> = {
  "data-specialist": {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: "🔍",
    label: "Data Specialist"
  },
  "smart-services": {
    color: "bg-cyan-100 text-cyan-800 border-cyan-200", 
    icon: "⚡",
    label: "Smart Services"
  },
  "algorithms": {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: "⚙️",
    label: "Algorithms"
  },
  "multi-disciplinary": {
    color: "bg-pink-100 text-pink-800 border-pink-200",
    icon: "🔬",
    label: "Multi-disciplinary"
  },
  "general": {
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: "📚",
    label: "General"
  }
};
