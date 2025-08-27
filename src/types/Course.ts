/**
 * Course data models and types for the UTwente DST Study Planner
 */

export type CourseType = "required" | "advanced" | "elective";

export type DataScienceProfile = 
  | "data-specialist"      // specialist in specific kinds of data (NLP, image, geo, sensor, networked)
  | "smart-services"       // designer of smart services
  | "algorithms"           // designer of data science algorithms
  | "multi-disciplinary"   // multi-disciplinary researcher
  | "general";             // general/foundational courses

export type Course = {
  id: string;       // unique id
  code?: string;    // Osiris code when known
  title: string;
  ec: number;       // study points
  duration: 1 | 2;  // number of quartiles occupied (contiguous)
  type: CourseType;
  // Data Science specialization profile(s) - can have multiple profiles
  profiles?: DataScienceProfile[];
  // Suggested placement (for convenience rendering only; not enforced)
  given?: { year: 1 | 2; q: 1 | 2 | 3 | 4 }[];
};

export type SlotId = `${1 | 2}Y-Q${1 | 2 | 3 | 4}`;

export const SLOT_IDS: SlotId[] = [
  "1Y-Q1", "1Y-Q2", "1Y-Q3", "1Y-Q4",
  "2Y-Q1", "2Y-Q2", "2Y-Q3", "2Y-Q4",
];

export const slotLabel = (slot: SlotId) => {
  const [y, q] = slot.split("-");
  return `${y.replace("Y", " year ")} – ${q.replace("Q", " quartile ")}`;
};
