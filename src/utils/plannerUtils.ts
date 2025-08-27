import { Course, SlotId, SLOT_IDS, slotLabel } from '../types/Course';

// ---- utility: EC accounting ----
export function perQuartileEc(assignments: Record<string, SlotId[]>, courses: Course[]): Record<SlotId, number> {
  const map = Object.fromEntries(SLOT_IDS.map((s) => [s, 0])) as Record<SlotId, number>;
  for (const c of courses) {
    const slots = assignments[c.id];
    if (!slots) continue;
    const share = c.ec / c.duration; // EC load per occupied quartile
    for (const s of slots) map[s] = +(map[s] + share).toFixed(2);
  }
  return map;
}

export function isAdjacent(a: SlotId, b: SlotId) {
  const [ay, aq] = a.split("-Q").map(Number);
  const [by, bq] = b.split("-Q").map(Number);
  return ay === by && Math.abs(aq - bq) === 1; // same year & neighbors
}

export function canPlace(course: Course, target: SlotId, assignments: Record<string, SlotId[]>, courses: Course[]) {
  // Check if the course can be given in the target quartile
  if (course.given && course.given.length > 0) {
    const [, qStr] = target.split("-Q");
    const targetQ = Number(qStr) as 1 | 2 | 3 | 4;
    const allowedQuartiles = course.given.map(g => g.q);
    
    if (!allowedQuartiles.includes(targetQ)) {
      return { ok: false, reason: `This course can only be taken in Q${allowedQuartiles.join(', Q')}.` } as const;
    }
  }

  // create a simulated placement and verify constraints
  const sim: Record<string, SlotId[]> = JSON.parse(JSON.stringify(assignments));

  if (course.duration === 1) {
    sim[course.id] = [target];
  } else {
    // For 2-quartile courses, attempt to span to an adjacent slot (prefer forward, else backward)
    const forward = ((): SlotId | null => {
      const [y, qStr] = target.split("-Q");
      const q = Number(qStr) as 1 | 2 | 3 | 4;
      if (q === 4) return null;
      return `${y}-Q${(q + 1) as 2 | 3 | 4}` as SlotId;
    })();
    const backward = ((): SlotId | null => {
      const [y, qStr] = target.split("-Q");
      const q = Number(qStr) as 1 | 2 | 3 | 4;
      if (q === 1) return null;
      return `${y}-Q${(q - 1) as 1 | 2 | 3}` as SlotId;
    })();

    const tryPairs: SlotId[][] = [];
    if (forward) tryPairs.push([target, forward]);
    if (backward) tryPairs.push([backward, target]);

    // For 2-quartile courses, also check if both quartiles are allowed
    if (course.given && course.given.length > 0) {
      const allowedQuartiles = course.given.map(g => g.q);
      const validPairs = tryPairs.filter(pair => {
        return pair.every(slot => {
          const [, qStr] = slot.split("-Q");
          const q = Number(qStr) as 1 | 2 | 3 | 4;
          return allowedQuartiles.includes(q);
        });
      });
      
      if (validPairs.length === 0) {
        return { ok: false, reason: `This course can only be taken in Q${allowedQuartiles.join(', Q')}.` } as const;
      }
      
      // Only try valid pairs
      for (const pair of validPairs) {
        sim[course.id] = pair;
        if (validate(sim, courses)) return { ok: true, slots: pair } as const;
      }
    } else {
      // No given restrictions, try all pairs
      for (const pair of tryPairs) {
        sim[course.id] = pair;
        if (validate(sim, courses)) return { ok: true, slots: pair } as const;
      }
    }
    
    return { ok: false, reason: "Needs two adjacent quartiles in the same year without exceeding 15 EC." } as const;
  }

  // single-quartile: check after placing
  const ok = validate(sim, courses);
  return ok ? { ok: true, slots: [target] as SlotId[] } as const : { ok: false, reason: "This drop would exceed 15 EC in this quartile." } as const;
}

export function validate(assignments: Record<string, SlotId[]>, courses: Course[]) {
  const ecMap = perQuartileEc(assignments, courses);
  return SLOT_IDS.every((s) => ecMap[s] <= 15 + 1e-9);
}

// Remove course from any slots
export function unassign(courseId: string, assignments: Record<string, SlotId[]>) {
  const copy = { ...assignments };
  delete copy[courseId];
  return copy;
}

// Check if a course can be placed in the highlighted quartile
export function isHighlightedForSlot(course: Course, slot: SlotId | null) {
  if (!slot) return false;
  
  // For highlighting, we only check if the course is allowed in this quartile
  // regardless of EC limits - this shows which courses are eligible
  if (course.given && course.given.length > 0) {
    const [, qStr] = slot.split("-Q");
    const targetQ = Number(qStr) as 1 | 2 | 3 | 4;
    const allowedQuartiles = course.given.map(g => g.q);
    
    // For 2-quartile courses, check if this quartile can be part of a valid span
    if (course.duration === 2) {
      const q = targetQ;
      
      // Check if this quartile can be the start or end of a valid 2-quartile span
      const canStartHere = q < 4 && allowedQuartiles.includes(q) && allowedQuartiles.includes((q + 1) as 1 | 2 | 3 | 4);
      const canEndHere = q > 1 && allowedQuartiles.includes(q) && allowedQuartiles.includes((q - 1) as 1 | 2 | 3 | 4);
      
      return canStartHere || canEndHere;
    }
    
    // For 1-quartile courses, just check if it's allowed in this quartile
    return allowedQuartiles.includes(targetQ);
  }
  
  // If no given restrictions, the course can be placed anywhere
  return true;
}

// Export functions
export function exportStudyProgramme(assignments: Record<string, SlotId[]>, courses: Course[], ecMap: Record<SlotId, number>) {
  const programmeData = {
    metadata: {
      title: "UTwente - Data Science & Technology Study Plan",
      exportDate: new Date().toISOString(),
      totalEC: Object.values(ecMap).reduce((sum, ec) => sum + ec, 0)
    },
    assignments: Object.keys(assignments).map(courseId => {
      const course = courses.find(c => c.id === courseId);
      const slots = assignments[courseId];
      return {
        course: {
          id: course?.id,
          code: course?.code,
          title: course?.title,
          ec: course?.ec,
          type: course?.type,
          duration: course?.duration
        },
        slots: slots,
        quartiles: slots.map(slot => {
          const [year, quarter] = slot.split('-');
          return `${year.replace('Y', 'ear ')} - ${quarter}`;
        }).join(', ')
      };
    }),
    quarterlyBreakdown: SLOT_IDS.map(slot => ({
      slot,
      label: slotLabel(slot),
      ec: ecMap[slot],
      courses: courses.filter(c => assignments[c.id]?.includes(slot)).map(c => ({
        title: c.title,
        code: c.code,
        ec: c.ec,
        type: c.type
      }))
    }))
  };

  const blob = new Blob([JSON.stringify(programmeData, null, 2)], {
    type: 'application/json'
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dst-study-plan-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportAsText(assignments: Record<string, SlotId[]>, courses: Course[], ecMap: Record<SlotId, number>) {
  let textContent = "UTwente - Data Science & Technology Study Plan\n";
  textContent += `Export Date: ${new Date().toLocaleString()}\n`;
  textContent += `Total EC: ${Object.values(ecMap).reduce((sum, ec) => sum + ec, 0)}\n\n`;

  for (let year = 1; year <= 2; year++) {
    textContent += `Year ${year}:\n`;
    
    for (let q = 1; q <= 4; q++) {
      const slot = `${year}Y-Q${q}` as SlotId;
      const coursesInQuartile = courses.filter(c => assignments[c.id]?.includes(slot));
      const quarterEc = ecMap[slot];
      
      textContent += `   Q${q} (${quarterEc} EC):\n`;
      
      if (coursesInQuartile.length === 0) {
        textContent += `      No courses assigned\n`;
      } else {
        coursesInQuartile.forEach(course => {
          const codeText = course.code ? `(${course.code})` : '(No code)';
          textContent += `      ${codeText} ${course.title} - ${course.ec} EC\n`;
        });
      }
      textContent += `\n`;
    }
  }

  // Add unassigned courses
  const assignedIds = new Set(Object.keys(assignments));
  const unassigned = courses.filter((c) => !assignedIds.has(c.id));
  
  if (unassigned.length > 0) {
    textContent += `Unassigned Courses:\n`;
    unassigned.forEach(course => {
      const codeText = course.code ? `(${course.code})` : '(No code)';
      textContent += `   ${codeText} ${course.title} - ${course.ec} EC\n`;
    });
  }

  const blob = new Blob([textContent], {
    type: 'text/plain'
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dst-study-plan-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
