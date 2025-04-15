import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js: A Beginner's Guide",
    excerpt:
      "Learn how to set up your first Next.js project and discover the key features that make it a powerful framework for React applications.",
    imageUrl: "/placeholders/blog1.jpg",
    date: "June 15, 2023",
    author: {
      name: "Alex Johnson",
      avatarUrl: "/placeholders/author1.jpg",
    },
    category: "Frameworks",
  },
  {
    id: "2",
    title: "Mastering CSS Grid: Layout Techniques for Modern Websites",
    excerpt:
      "Dive into advanced CSS Grid techniques that will help you create complex layouts with minimal code.",
    imageUrl: "/placeholders/blog2.jpg",
    date: "July 3, 2023",
    author: {
      name: "Samantha Lee",
      avatarUrl: "/placeholders/author2.jpg",
    },
    category: "CSS",
  },
  {
    id: "3",
    title: "API Authentication: Best Practices for Security",
    excerpt:
      "Explore the various authentication methods for APIs and learn how to implement them securely in your applications.",
    imageUrl: "/placeholders/blog3.jpg",
    date: "July 25, 2023",
    author: {
      name: "David Chen",
      avatarUrl: "/placeholders/author3.jpg",
    },
    category: "Security",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
          >
            View all articles
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
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/9] relative">
                {/* Placeholder div for image */}
                <div className="w-full h-full bg-gray-200"></div>
                {/* In production, use actual images */}
                {/* <Image 
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                /> */}
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>

                <h3 className="font-bold text-xl mb-3 line-clamp-2">
                  <Link
                    href={`/blog/${post.id}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                  {/* <Image 
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full mr-3"
                  /> */}
                  <span className="text-sm font-medium">
                    {post.author.name}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
