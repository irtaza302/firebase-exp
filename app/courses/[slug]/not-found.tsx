import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CourseNotFound() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
      <p className="text-gray-600 mb-8">
        The course you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button variant="default" asChild>
        <Link href="/courses">Browse All Courses</Link>
      </Button>
    </div>
  );
} 