import { Course, SlotId, SLOT_IDS } from '../types/Course';

// localStorage utilities for saving/loading study plans
const STORAGE_KEY = 'utwente-dst-study-plan';

export function saveToLocalStorage(assignments: Record<string, SlotId[]>) {
  try {
    const planData = {
      assignments,
      lastModified: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(planData));
  } catch (error) {
    console.warn('Failed to save study plan to localStorage:', error);
  }
}

export function loadFromLocalStorage(): Record<string, SlotId[]> | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const planData = JSON.parse(stored);
    
    // Validate the stored data structure
    if (planData && typeof planData.assignments === 'object' && planData.version) {
      return planData.assignments;
    }
    return null;
  } catch (error) {
    console.warn('Failed to load study plan from localStorage:', error);
    return null;
  }
}

export function clearLocalStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear study plan from localStorage:', error);
  }
}
