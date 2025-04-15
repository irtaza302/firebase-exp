import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CourseWithInstructors } from "@/lib/courses/data";

interface CourseCardProps {
  course: CourseWithInstructors;
  showAction?: boolean;
}

export default function CourseCard({ course, showAction = true }: CourseCardProps) {
  const {
    title,
    slug,
    thumbnail_url,
    description,
    instructors,
    categories,
  } = course;

  // Default image if none provided
  const courseImage = thumbnail_url || "https://picsum.photos/800/600?random=1";
  
  // Take first instructor if available
  const instructor = instructors && instructors.length > 0 ? instructors[0] : null;
  
  // Take first category if available
  const category = categories && categories.length > 0 ? categories[0] : null;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link href={`/courses/${slug}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={courseImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded">
              {category.name}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Course Title */}
        <Link href={`/courses/${slug}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Instructor Info */}
        {instructor && (
          <div className="flex items-center mb-3">
            <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
              <Image
                src={instructor.avatar_url || "https://picsum.photos/200/200?random=1"}
                alt={instructor.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-gray-600">{instructor.name}</span>
          </div>
        )}

        {/* Description (if available) */}
        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        )}

        {/* Call to Action */}
        {showAction && (
          <div className="mt-4 flex justify-end">
            <Button variant="default" size="sm" asChild>
              <Link href={`/courses/${slug}`}>View Course</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 