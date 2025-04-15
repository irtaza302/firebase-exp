import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Master Creative Skills With Industry Experts
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
              Learn design, development, and digital creativity from world-class
              instructors. Start your creative journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="lg" asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                asChild
              >
                <Link href="/instructors">Meet Our Instructors</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">50+</div>
                <div className="text-sm text-blue-200">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">10k+</div>
                <div className="text-sm text-blue-200">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">4.8</div>
                <div className="text-sm text-blue-200">Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-orange-500 rounded-full opacity-70 blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400 rounded-full opacity-70 blur-xl"></div>

            {/* Main Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <div className="aspect-[4/3] relative">
                <Image
                  src="https://picsum.photos/800/600?random=10"
                  alt="Creative professional working on a laptop"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Floating Card */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-black p-3 rounded-lg shadow-lg max-w-[200px]">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Learning Made Easy</div>
                </div>
                <p className="text-xs text-gray-600">
                  Step-by-step tutorials from industry professionals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
