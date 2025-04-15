interface Instructor {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const instructors: Instructor[] = [
  {
    name: "Alex Johnson",
    role: "Lead Instructor",
    bio: "Frontend specialist with 10+ years of experience. Previously worked at Google and Facebook.",
    imageUrl: "/placeholders/instructor1.jpg",
    socialLinks: {
      twitter: "https://twitter.com/alexj",
      linkedin: "https://linkedin.com/in/alexj",
      github: "https://github.com/alexj",
    },
  },
  {
    name: "Samantha Lee",
    role: "Senior Developer",
    bio: "Full-stack developer and educator focused on React and Node.js ecosystem with a passion for clean code.",
    imageUrl: "/placeholders/instructor2.jpg",
    socialLinks: {
      twitter: "https://twitter.com/samlee",
      linkedin: "https://linkedin.com/in/samlee",
      github: "https://github.com/samlee",
    },
  },
  {
    name: "David Chen",
    role: "UI/UX Specialist",
    bio: "Designer turned developer specializing in creating beautiful, accessible web experiences.",
    imageUrl: "/placeholders/instructor3.jpg",
    socialLinks: {
      twitter: "https://twitter.com/davidc",
      linkedin: "https://linkedin.com/in/davidc",
      github: "https://github.com/davidc",
    },
  },
  {
    name: "Maria Rodriguez",
    role: "Backend Expert",
    bio: "Database and API architect with deep knowledge of cloud infrastructure and serverless technologies.",
    imageUrl: "/placeholders/instructor4.jpg",
    socialLinks: {
      twitter: "https://twitter.com/mariar",
      linkedin: "https://linkedin.com/in/mariar",
      github: "https://github.com/mariar",
    },
  },
];

export default function InstructorsShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Learn From The Best</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our instructors are industry professionals who bring real-world
            experience to every lesson.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] relative">
                {/* Placeholder div for image */}
                <div className="w-full h-full bg-gray-200"></div>
                {/* In production, use actual images */}
                {/* <Image 
                  src={instructor.imageUrl}
                  alt={instructor.name}
                  fill
                  className="object-cover"
                /> */}
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl mb-1">{instructor.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-3">
                  {instructor.role}
                </p>
                <p className="text-gray-600 text-sm mb-4">{instructor.bio}</p>

                <div className="flex space-x-4">
                  {instructor.socialLinks.twitter && (
                    <a
                      href={instructor.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}

                  {instructor.socialLinks.linkedin && (
                    <a
                      href={instructor.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </a>
                  )}

                  {instructor.socialLinks.github && (
                    <a
                      href={instructor.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Learn more about our team
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
