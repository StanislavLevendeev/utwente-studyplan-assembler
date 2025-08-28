import React, { useMemo, useState, useEffect } from "react";
import { SlotId, Course, DataScienceProfile } from "../types/Course";
import { ALL_COURSES } from "../data/courseData";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/storage";
import { initialAssignments } from "../utils/initialState";
import { 
  perQuartileEc, 
  canPlace, 
  unassign, 
  isHighlightedForSlot 
} from "../utils/plannerUtils";
import { filterCourses } from "../utils/filterUtils";
import { Header } from "./Header";
import { UnassignedCourses } from "./UnassignedCourses";
import { Legend } from "./Legend";
import { PlannerGrid } from "./PlannerGrid";
import { Footer } from "./Footer";

/**
 * UTwente Data Science & Technology (MSc CS) – visual study planner
 * - Grid: Year 1 & Year 2, Quartiles Q1–Q4 (15 EC max per quartile)
 * - Drag from sidebar into grid; drop back to sidebar to unassign
 * - Most courses are 5 EC & 1 quartile
 * - Exceptions handled here:
 *    • Data Science (10 EC) spans 2 quartiles (Q2–Q3 recommended)
 *    • Research Topics (10 EC) spans 2 adjacent quartiles
 *    • Final Project (30 EC) spans 2 adjacent quartiles (15+15)
 * - Styling by type: required / advanced / elective
 *
 * Notes:
 * • The list below is prefilled based on the DST page. Adjust as needed.
 * • You can add/remove courses in the `ALL_COURSES` list.
 */

export default function UTwenteDSTPlanner() {
  const [assignments, setAssignments] = useState<Record<string, SlotId[]>>(() => {
    // Try to load from localStorage first, fallback to initial assignments
    const saved = loadFromLocalStorage();
    return saved || initialAssignments();
  });
  const [notice, setNotice] = useState<string | null>(null);
  const [highlightedSlot, setHighlightedSlot] = useState<SlotId | null>(null);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProfiles, setSelectedProfiles] = useState<DataScienceProfile[]>([]);

  // Save to localStorage whenever assignments change
  useEffect(() => {
    saveToLocalStorage(assignments);
  }, [assignments]);

  const courses = useMemo(() => ALL_COURSES, []);

  const assignedIds = new Set(Object.keys(assignments));
  const unassigned = courses.filter((c) => !assignedIds.has(c.id));

  // Apply filters to unassigned courses
  const filteredUnassigned = useMemo(() => 
    filterCourses(unassigned, searchTerm, selectedProfiles), 
    [unassigned, searchTerm, selectedProfiles]
  );

  const ecMap = perQuartileEc(assignments, courses);

  const handleDrop = (slot: SlotId, courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    // If the course is already placed, remove first (so it can be moved)
    let next = unassign(courseId, assignments);

    const attempt = canPlace(course, slot, next, courses);
    if (attempt.ok) {
      next[course.id] = attempt.slots;
      setAssignments(next);
      setNotice(null);
    } else {
      setNotice(attempt.reason);
    }
  };

  const removeFromSlot = (courseId: string) => setAssignments(unassign(courseId, assignments));

  const handleQuartileClick = (slot: SlotId) => {
    setHighlightedSlot(slot);
    // Clear highlight after 30 seconds
    setTimeout(() => {
      setHighlightedSlot(null);
    }, 30000);
  };

  const handleProfileToggle = (profile: DataScienceProfile) => {
    setSelectedProfiles(prev => 
      prev.includes(profile) 
        ? prev.filter(p => p !== profile)
        : [...prev, profile]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedProfiles([]);
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-slate-50 text-slate-900 mt-6">
      <div className="mx-auto max-w-7xl">
        <Header
          notice={notice}
          assignments={assignments}
          courses={courses}
          ecMap={ecMap}
          setAssignments={setAssignments}
          setNotice={setNotice}
        />

        <div className="grid grid-cols-12 gap-6 min-h-[calc(100vh-600px)]">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col">
            <div className="flex flex-col h-full space-y-6">
              <UnassignedCourses
                unassigned={filteredUnassigned}
                highlightedSlot={highlightedSlot}
                assignments={assignments}
                setAssignments={setAssignments}
                isHighlightedForSlot={isHighlightedForSlot}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedProfiles={selectedProfiles}
                onProfileToggle={handleProfileToggle}
                onClearFilters={handleClearFilters}
              />
              
              <Legend />
            </div>
          </aside>

          {/* Planner grid */}
          <PlannerGrid
            courses={courses}
            assignments={assignments}
            ecMap={ecMap}
            handleDrop={handleDrop}
            removeFromSlot={removeFromSlot}
            handleQuartileClick={handleQuartileClick}
            unassignedCourses={unassigned}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
