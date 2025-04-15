import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/lib/types/supabase";

export interface CourseWithInstructors extends Tables<"courses"> {
  instructors: Tables<"instructors">[];
  categories: Tables<"categories">[];
}

export interface CourseWithDetails extends CourseWithInstructors {
  sections: {
    id: string;
    title: string;
    description: string | null;
    order_index: number;
    lessons: {
      id: string;
      title: string;
      description: string | null;
      duration: number | null;
      is_free: boolean;
      order_index: number;
    }[];
  }[];
}

interface CourseInstructor {
  instructor: Tables<"instructors">;
}

interface CourseCategory {
  category: Tables<"categories">;
}

/**
 * Fetch all published courses
 */
export async function getPublishedCourses() {
  const supabase = await createClient();
  
  const { data: courses, error } = await supabase
    .from("courses")
    .select(`
      *,
      instructors:course_instructors(
        instructor:instructors(*)
      ),
      categories:course_categories(
        category:categories(*)
      )
    `)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }

  // Transform the data to match our desired interface
  return courses.map(course => {
    const transformedCourse: CourseWithInstructors = {
      ...course,
      instructors: course.instructors.map((i: CourseInstructor) => i.instructor),
      categories: course.categories.map((c: CourseCategory) => c.category),
    };
    return transformedCourse;
  });
}

/**
 * Fetch featured courses
 */
export async function getFeaturedCourses() {
  const supabase = await createClient();
  
  const { data: courses, error } = await supabase
    .from("courses")
    .select(`
      *,
      instructors:course_instructors(
        instructor:instructors(*)
      ),
      categories:course_categories(
        category:categories(*)
      )
    `)
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured courses:", error);
    return [];
  }

  // Transform the data to match our desired interface
  return courses.map(course => {
    const transformedCourse: CourseWithInstructors = {
      ...course,
      instructors: course.instructors.map((i: CourseInstructor) => i.instructor),
      categories: course.categories.map((c: CourseCategory) => c.category),
    };
    return transformedCourse;
  });
}

/**
 * Fetch a course by slug
 */
export async function getCourseBySlug(slug: string): Promise<CourseWithDetails | null> {
  const supabase = await createClient();
  
  // First get the course
  const { data: course, error } = await supabase
    .from("courses")
    .select(`
      *,
      instructors:course_instructors(
        instructor:instructors(*)
      ),
      categories:course_categories(
        category:categories(*)
      )
    `)
    .eq("slug", slug)
    .single();

  if (error || !course) {
    console.error("Error fetching course:", error);
    return null;
  }

  // Get the sections and lessons
  const { data: sections, error: sectionsError } = await supabase
    .from("sections")
    .select(`
      *,
      lessons(*)
    `)
    .eq("course_id", course.id)
    .order("order_index", { ascending: true });

  if (sectionsError) {
    console.error("Error fetching sections:", sectionsError);
    return null;
  }

  // Transform the sections to sort lessons by order_index
  const transformedSections = sections.map(section => ({
    ...section,
    lessons: (section.lessons || []).sort((a, b) => a.order_index - b.order_index)
  }));

  // Transform the course
  const transformedCourse: CourseWithDetails = {
    ...course,
    instructors: course.instructors.map((i: CourseInstructor) => i.instructor),
    categories: course.categories.map((c: CourseCategory) => c.category),
    sections: transformedSections
  };

  return transformedCourse;
}

/**
 * Fetch a lesson by ID
 */
export async function getLessonById(lessonId: string) {
  const supabase = await createClient();
  
  const { data: lesson, error } = await supabase
    .from("lessons")
    .select(`
      *,
      section:sections(
        *,
        course:courses(*)
      ),
      resources(*)
    `)
    .eq("id", lessonId)
    .single();

  if (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }

  return lesson;
}

/**
 * Update user's lesson progress
 */
export async function updateLessonProgress(
  userId: string, 
  lessonId: string, 
  position: number, 
  completed: boolean = false
) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("user_progress")
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      last_watched_position: position,
      completed
    }, {
      onConflict: "user_id,lesson_id"
    });

  if (error) {
    console.error("Error updating lesson progress:", error);
    return null;
  }

  return data;
}

/**
 * Get user's lesson progress
 */
export async function getLessonProgress(userId: string, lessonId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single();

  if (error && error.code !== "PGRST116") { // PGRST116 is "not found" which is expected
    console.error("Error fetching lesson progress:", error);
  }

  return data || null;
} 