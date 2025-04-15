import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface Course {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  instructor: {
    name: string;
    avatar: string;
  };
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  rating: number;
  ratingCount: number;
  price: number;
  salePrice?: number;
  category: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const {
    title,
    slug,
    coverImage,
    instructor,
    duration,
    level,
    rating,
    ratingCount,
    price,
    salePrice,
    category,
  } = course;

  const discountPercentage = salePrice
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link href={`/courses/${slug}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded">
            {category}
          </span>
        </div>

        {/* Discount Badge */}
        {salePrice && (
          <div className="absolute top-4 right-4">
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded">
              {discountPercentage}% OFF
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
        <div className="flex items-center mb-3">
          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
            <Image
              src={instructor.avatar}
              alt={instructor.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-600">{instructor.name}</span>
        </div>

        {/* Course Meta */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>{level}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 mr-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {rating} ({ratingCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {salePrice ? (
              <div className="flex items-center">
                <span className="text-gray-500 line-through text-sm mr-2">
                  ${price}
                </span>
                <span className="text-lg font-bold text-blue-600">
                  ${salePrice}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-blue-600">${price}</span>
            )}
          </div>
          <Button variant="default" size="sm" asChild>
            <Link href={`/courses/${slug}`}>View Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
