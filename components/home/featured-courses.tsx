import Link from "next/link";
import CourseCard from "@/components/courses/course-card-new";
import { Button } from "@/components/ui/button";
import { getFeaturedCourses } from "@/lib/courses/data";

export default async function FeaturedCourses() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular courses and start your creative journey
            today
          </p>
        </div>

        {featuredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No featured courses available at the moment.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button variant="default" size="lg" asChild>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
