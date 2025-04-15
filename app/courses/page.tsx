import CourseCard from "@/components/courses/course-card-new";
import { Button } from "@/components/ui/button";
import { getPublishedCourses } from "@/lib/courses/data";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Courses | BootRocket",
  description: "Browse our collection of expert-led courses to elevate your creative skills.",
};

export default async function CoursesPage() {
  const courses = await getPublishedCourses();
  
  // Fetch categories for the filter (this could be moved to a separate function in lib/courses/data.ts)
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Expand Your Creative Skills
          </h1>
          <p className="max-w-2xl mx-auto text-xl">
            Discover courses taught by industry experts and take your skills to
            the next level.
          </p>
        </div>
      </div>

      {/* Filters and Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Categories
              </h2>
              <div className="space-y-2">
                {categories?.map((category) => (
                  <div className="flex items-center" key={category.id}>
                    <input
                      id={`category-${category.id}`}
                      name="category"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Level
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="level-beginner"
                      name="level"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="level-beginner"
                      className="ml-3 text-sm text-gray-600"
                    >
                      Beginner
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="level-intermediate"
                      name="level"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="level-intermediate"
                      className="ml-3 text-sm text-gray-600"
                    >
                      Intermediate
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="level-advanced"
                      name="level"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="level-advanced"
                      className="ml-3 text-sm text-gray-600"
                    >
                      Advanced
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-6 lg:mt-0 lg:col-span-9">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                All Courses {courses.length > 0 && `(${courses.length})`}
              </h2>

              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Sort by:
                </span>
                <select className="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                  <option>Most Popular</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Courses Found</h3>
            <p className="text-gray-600">Please check back later for new courses.</p>
          </div>
        )}
      </div>
    </div>
  );
}
