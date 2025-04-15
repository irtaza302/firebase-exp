import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/courses/data";
import { notFound } from "next/navigation";

interface CourseDetailsParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CourseDetailsParams) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    return {
      title: "Course Not Found | BootRocket",
      description: "The requested course could not be found.",
    };
  }

  return {
    title: `${course.title} | BootRocket`,
    description: course.description || `Learn ${course.title}. Comprehensive training with practical examples and expert guidance.`,
    keywords: [
      ...(course.categories?.map(cat => cat.name) || []),
      "online course",
      "creative skills",
      course.title,
    ],
  };
}

export default async function CourseDetails({ params }: CourseDetailsParams) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  // Get primary instructor if available
  const primaryInstructor = course.instructors.length > 0 ? course.instructors[0] : null;
  // Get primary category if available
  const primaryCategory = course.categories.length > 0 ? course.categories[0] : null;

  return (
    <div className="bg-white">
      {/* Course Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {primaryCategory && (
                <div className="mb-4">
                  <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded">
                    {primaryCategory.name}
                  </span>
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>

              <p className="text-gray-300 mb-6">
                {course.description}
              </p>

              {primaryInstructor && (
                <div className="flex items-center mb-8">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={primaryInstructor.avatar_url || "https://picsum.photos/200/200?random=1"}
                      alt={primaryInstructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400">
                      Instructor
                    </span>
                    <span className="block font-medium">
                      {primaryInstructor.name}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="accent" size="lg" className="flex-grow">
                  Enroll Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 hover:bg-white/10"
                >
                  Watch Preview
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <div className="aspect-video relative">
                  <Image
                    src={course.thumbnail_url || "https://picsum.photos/800/600?random=1"}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">About This Course</h2>
              <div className="prose max-w-none">
                <p>{course.long_description || course.description}</p>
              </div>
            </div>

            {/* Course Sections */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              
              {course.sections.length > 0 ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {course.sections.map((section, index) => (
                    <div key={section.id} className="border-b border-gray-200 last:border-0">
                      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                        <h3 className="font-medium">
                          Section {index + 1}: {section.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {section.lessons.length} lessons
                        </span>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500 w-7">
                                {lessonIndex + 1}.
                              </span>
                              <span>{lesson.title}</span>
                              {lesson.is_free && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                                  Free
                                </span>
                              )}
                            </div>
                            <div className="flex items-center">
                              {lesson.duration && (
                                <span className="text-sm text-gray-500">
                                  {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
                                </span>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2"
                                asChild
                              >
                                <Link href={`/courses/lesson/${lesson.id}`}>
                                  {lesson.is_free ? "Watch" : "Preview"}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-gray-200 rounded-lg">
                  <p className="text-gray-500">No content available for this course yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-10 lg:mt-0">
            <div className="sticky top-10 bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">This course includes:</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {course.sections.reduce((count, section) => count + section.lessons.length, 0)} lessons
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Full lifetime access</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Access on mobile and desktop</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Certificate of completion</span>
                </li>
              </ul>

              <Button variant="accent" size="lg" className="w-full mb-4">
                Enroll Now
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
