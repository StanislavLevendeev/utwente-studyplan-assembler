import { Course, DataScienceProfile } from "../types/Course";

/**
 * Filter courses based on search term and selected profiles
 */
export const filterCourses = (
  courses: Course[],
  searchTerm: string,
  selectedProfiles: DataScienceProfile[]
): Course[] => {
  return courses.filter((course) => {
    // Search filter: check if search term matches course title or code
    const matchesSearch = !searchTerm || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.code && course.code.toLowerCase().includes(searchTerm.toLowerCase()));

    // Profile filter: if no profiles selected, show all courses
    // If profiles selected, show courses that have at least one matching profile
    // Also show courses without profiles (like required/advanced courses)
    const matchesProfile = selectedProfiles.length === 0 ||
      !course.profiles ||
      course.profiles.some(profile => selectedProfiles.includes(profile));

    return matchesSearch && matchesProfile;
  });
};
