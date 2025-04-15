import Link from "next/link";

export const metadata = {
  title: "About Us - BootRocket",
  description:
    "Learn about our mission, our team and our journey to deliver world-class web development education.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About BootRocket</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We&apos;re on a mission to make web development education
            accessible, practical, and enjoyable for everyone.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                BootRocket was founded in 2018 by a team of passionate
                developers and educators who saw a gap in how coding was being
                taught online. We believed that the best way to learn was by
                building real projects, with instructors who were actively
                working in the industry.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Since then, we&apos;ve helped thousands of students transform
                their careers, launch their own projects, and gain the
                confidence to call themselves developers.
              </p>
            </div>
            <div className="md:w-1/2 relative aspect-video">
              <div className="bg-gray-200 rounded-lg w-full h-full"></div>
              {/* Placeholder for image: <Image src="/images/about-team.jpg" alt="BootRocket Team" fill className="object-cover rounded-lg" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Practical Learning",
                description:
                  "We believe in learning by doing. Our courses focus on building real projects that you can add to your portfolio.",
                icon: "🛠️",
              },
              {
                title: "Industry Relevance",
                description:
                  "All our content is created by professionals who are active in the industry, ensuring what you learn is current and valuable.",
                icon: "🚀",
              },
              {
                title: "Community Support",
                description:
                  "Learning is better together. Our community of students and instructors are always ready to help and inspire.",
                icon: "🤝",
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & Lead Instructor",
                img: "/placeholders/team1.jpg",
              },
              {
                name: "Samantha Lee",
                role: "Senior Developer & Instructor",
                img: "/placeholders/team2.jpg",
              },
              {
                name: "David Chen",
                role: "Content Director",
                img: "/placeholders/team3.jpg",
              },
              {
                name: "Maya Patel",
                role: "Community Manager",
                img: "/placeholders/team4.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-40 h-40 bg-gray-200 rounded-full mb-4"></div>
                {/* Placeholder for image: <Image src={member.img} alt={member.name} width={160} height={160} className="rounded-full mb-4" /> */}
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-blue-600 text-white">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students who have transformed their careers with
            our courses.
          </p>
          <Link
            href="/courses"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors"
          >
            Explore Our Courses
          </Link>
        </div>
      </section>
    </main>
  );
}
