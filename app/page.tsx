import HeroSection from "@/components/home/hero-section";
import FeaturedCourses from "@/components/home/featured-courses";
import TestimonialsSection from "@/components/home/testimonials-section";
import InstructorsShowcase from "@/components/home/instructors-showcase";
import StatsSection from "@/components/home/stats-section";
import BlogPreview from "@/components/home/blog-preview";
import Newsletter from "@/components/layout/newsletter";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCourses />
      <StatsSection />
      <TestimonialsSection />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse Courses by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect course to advance your skills in any creative
              field
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </section>

      <InstructorsShowcase />

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Creative Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already advancing their careers
            with our comprehensive courses.
          </p>
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:text-lg"
            >
              Browse All Courses
            </Link>
          </div>
        </div>
      </section>

      <BlogPreview />
      <Newsletter />
    </>
  );
}

// Category Card Component
function CategoryCard({
  title,
  icon,
  count,
  slug,
}: {
  id: string;
  title: string;
  icon: string;
  count: number;
  slug: string;
}) {
  return (
    <a
      href={`/categories/${slug}`}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
    >
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
        <span dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{count} courses</p>
    </a>
  );
}

// Sample data for categories
const categories = [
  {
    id: "1",
    title: "Photoshop",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></svg>',
    count: 15,
    slug: "photoshop",
  },
  {
    id: "2",
    title: "Illustrator",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path></svg>',
    count: 12,
    slug: "illustrator",
  },
  {
    id: "3",
    title: "Web Design",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path></svg>',
    count: 10,
    slug: "web-design",
  },
  {
    id: "4",
    title: "UX/UI",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 12c0-1.4-1.1-2.5-2.5-2.5S12.5 10.6 12.5 12s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-2.5 1.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm9.1-9.3-1.4-1.4c-.4-.4-1-.4-1.4 0L16 8V4h-6v4L2.4 2.9C2 2.5 1.4 2.5 1 2.9L2.4 4.3 5 6.9V17c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3V6.9l2.6-2.6 1.4-1.4c.3-.4.3-1-.1-1.3zM17 17c0 .6-.4 1-1 1H8c-.6 0-1-.4-1-1V8.4l10-10V17z"></path></svg>',
    count: 8,
    slug: "ux-ui",
  },
  {
    id: "5",
    title: "Video Editing",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6.47L5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4z"></path></svg>',
    count: 7,
    slug: "video-editing",
  },
  {
    id: "6",
    title: "InDesign",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></svg>',
    count: 5,
    slug: "indesign",
  },
  {
    id: "7",
    title: "3D & Animation",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></svg>',
    count: 6,
    slug: "3d-animation",
  },
  {
    id: "8",
    title: "Photography",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12m-3.2 0a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0"></path><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path></svg>',
    count: 9,
    slug: "photography",
  },
];
