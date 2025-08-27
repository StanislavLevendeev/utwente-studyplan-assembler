import { Course, SlotId } from '../types/Course';
import { REQUIRED } from '../data/courseData';

// initial placement: required courses into suggested slots (spanning across 2 contiguous quartiles when needed)
export function initialAssignments(): Record<string, SlotId[]> {
  const asg: Record<string, SlotId[]> = {};
  for (const c of REQUIRED) {
    if (!c.given || c.given.length === 0) continue;
    if (c.duration === 1) {
      const s = c.given[0];
      asg[c.id] = [`${s.year}Y-Q${s.q}` as SlotId];
    } else if (c.duration === 2) {
      // pick first two suggestions if given, else try 2 adjacent in same year
      const s = c.given;
      if (s && s.length >= 2) {
        asg[c.id] = [
          `${s[0].year}Y-Q${s[0].q}` as SlotId,
          `${s[1].year}Y-Q${s[1].q}` as SlotId,
        ];
      }
    }
  }
  return asg;
}
