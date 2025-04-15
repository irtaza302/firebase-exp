-- Insert sample categories
INSERT INTO public.categories (name, slug) VALUES
  ('Web Development', 'web-development'),
  ('Design', 'design'),
  ('Photography', 'photography'),
  ('Business', 'business'),
  ('Marketing', 'marketing');

-- Insert sample instructors
INSERT INTO public.instructors (name, bio, avatar_url) VALUES
  ('John Doe', 'Experienced web developer with 10+ years of industry experience.', 'https://picsum.photos/200/200?random=1'),
  ('Jane Smith', 'UI/UX designer and creative director with a passion for beautiful interfaces.', 'https://picsum.photos/200/200?random=2'),
  ('Michael Johnson', 'Professional photographer specializing in landscapes and portraits.', 'https://picsum.photos/200/200?random=3'),
  ('Sarah Williams', 'Marketing expert with experience in digital campaigns and SEO strategy.', 'https://picsum.photos/200/200?random=4');

-- Insert sample courses
INSERT INTO public.courses (title, slug, description, long_description, thumbnail_url, featured, published) VALUES
  (
    'Web Development Masterclass', 
    'web-development-masterclass',
    'Learn modern web development with this comprehensive course. From HTML to React and Node.js.',
    'This comprehensive course covers everything you need to know to become a successful web developer. You will learn HTML, CSS, JavaScript, React, Node.js, and more. By the end of this course, you will be able to build complete web applications from scratch.

The course is structured to take you from the basics to advanced concepts gradually, with practical projects at each stage to reinforce your learning. You will build real-world applications that you can add to your portfolio.

Start your web development journey today and join thousands of successful students who have transformed their careers with this course.',
    'https://picsum.photos/800/600?random=1',
    true,
    true
  ),
  (
    'UI/UX Design Principles', 
    'ui-ux-design-principles',
    'Master the fundamentals of UI/UX design and create beautiful, user-friendly interfaces.',
    'This course will teach you the principles of UI/UX design that lead to beautiful, user-friendly interfaces. You will learn how to conduct user research, create wireframes and prototypes, and design visually appealing interfaces that users love.

Throughout the course, you will work on practical design challenges that mirror real-world scenarios. You will also learn how to use industry-standard tools like Figma, Sketch, and Adobe XD to create your designs.

By the end of this course, you will have a solid understanding of design principles and the skills needed to create exceptional user experiences.',
    'https://picsum.photos/800/600?random=2',
    true,
    true
  ),
  (
    'Photography Fundamentals', 
    'photography-fundamentals',
    'Learn the basics of photography, from camera settings to composition and editing.',
    'This course covers all the essential aspects of photography, starting with understanding your camera and its settings. You will learn how to compose stunning photos, work with lighting, and edit your images to make them truly stand out.

The course is designed for beginners but includes advanced techniques that will be valuable as you progress. Each lesson includes practical exercises that you can complete with any camera, from a smartphone to a DSLR.

Join us on this creative journey and discover the joy of capturing beautiful moments through photography.',
    'https://picsum.photos/800/600?random=3',
    false,
    true
  ),
  (
    'Digital Marketing Essentials', 
    'digital-marketing-essentials',
    'Develop effective digital marketing strategies and grow your online presence.',
    'This course will equip you with the skills and knowledge needed to develop effective digital marketing strategies. You will learn about SEO, social media marketing, email campaigns, content marketing, and analytics.

Through real-world case studies and practical assignments, you will gain hands-on experience in creating and implementing marketing campaigns that drive results. You will also learn how to measure the success of your efforts and optimize your strategies for maximum impact.

Whether you are a business owner looking to grow your online presence or aspiring to become a digital marketing professional, this course provides the foundation you need to succeed in the digital landscape.',
    'https://picsum.photos/800/600?random=4',
    true,
    true
  ),
  (
    'Advanced JavaScript Programming', 
    'advanced-javascript-programming',
    'Take your JavaScript skills to the next level with advanced concepts and modern frameworks.',
    'This advanced course is designed for developers who already have a basic understanding of JavaScript and want to deepen their knowledge. You will explore advanced JavaScript concepts such as closures, prototypes, async/await, and more.

The course also covers modern JavaScript frameworks and libraries such as React, Vue, and Node.js, teaching you how to build complex applications with clean, maintainable code. You will learn best practices for testing, debugging, and optimizing your JavaScript code.

By the end of this course, you will have the confidence and skills to tackle challenging JavaScript projects and stay ahead in the rapidly evolving world of web development.',
    'https://picsum.photos/800/600?random=5',
    false,
    false
  );

-- Associate courses with categories
INSERT INTO public.course_categories (course_id, category_id) VALUES
  ((SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'), (SELECT id FROM public.categories WHERE slug = 'web-development')),
  ((SELECT id FROM public.courses WHERE slug = 'ui-ux-design-principles'), (SELECT id FROM public.categories WHERE slug = 'design')),
  ((SELECT id FROM public.courses WHERE slug = 'photography-fundamentals'), (SELECT id FROM public.categories WHERE slug = 'photography')),
  ((SELECT id FROM public.courses WHERE slug = 'digital-marketing-essentials'), (SELECT id FROM public.categories WHERE slug = 'marketing')),
  ((SELECT id FROM public.courses WHERE slug = 'digital-marketing-essentials'), (SELECT id FROM public.categories WHERE slug = 'business')),
  ((SELECT id FROM public.courses WHERE slug = 'advanced-javascript-programming'), (SELECT id FROM public.categories WHERE slug = 'web-development'));

-- Associate courses with instructors
INSERT INTO public.course_instructors (course_id, instructor_id) VALUES
  ((SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'), (SELECT id FROM public.instructors WHERE name = 'John Doe')),
  ((SELECT id FROM public.courses WHERE slug = 'ui-ux-design-principles'), (SELECT id FROM public.instructors WHERE name = 'Jane Smith')),
  ((SELECT id FROM public.courses WHERE slug = 'photography-fundamentals'), (SELECT id FROM public.instructors WHERE name = 'Michael Johnson')),
  ((SELECT id FROM public.courses WHERE slug = 'digital-marketing-essentials'), (SELECT id FROM public.instructors WHERE name = 'Sarah Williams')),
  ((SELECT id FROM public.courses WHERE slug = 'advanced-javascript-programming'), (SELECT id FROM public.instructors WHERE name = 'John Doe'));

-- Create sections for web development course
INSERT INTO public.sections (course_id, title, description, order_index) VALUES
  ((SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'), 'Introduction to Web Development', 'Get started with the basics of web development and set up your development environment.', 1),
  ((SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'), 'HTML Fundamentals', 'Learn the building blocks of web pages: HTML elements, attributes, and semantic markup.', 2),
  ((SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'), 'CSS Styling', 'Master CSS to style your web pages and create responsive layouts.', 3),
  ((SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'), 'JavaScript Essentials', 'Add interactivity to your websites with JavaScript.', 4);

-- Create lessons for the web development course sections
INSERT INTO public.lessons (section_id, title, description, content, video_url, duration, is_free, order_index) VALUES
  (
    (SELECT id FROM public.sections WHERE title = 'Introduction to Web Development' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass')),
    'Welcome to the Course',
    'Overview of what you will learn in this course and how to get the most out of it.',
    'Welcome to the Web Development Masterclass! In this course, you will learn all the skills needed to become a successful web developer. This introduction video covers the course structure and how to approach the lessons for maximum benefit.',
    'https://example.com/videos/welcome',
    300,
    true,
    1
  ),
  (
    (SELECT id FROM public.sections WHERE title = 'Introduction to Web Development' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass')),
    'Setting Up Your Development Environment',
    'Install and configure the tools you need for web development.',
    'In this lesson, we will set up all the tools you need for web development, including a code editor, browser developer tools, and version control with Git. We will also introduce you to package managers and task runners.',
    'https://example.com/videos/setup',
    900,
    true,
    2
  ),
  (
    (SELECT id FROM public.sections WHERE title = 'HTML Fundamentals' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass')),
    'HTML Document Structure',
    'Learn the basic structure of HTML documents and how to create them.',
    'This lesson covers the essential structure of HTML documents, including doctype declarations, head and body sections, and metadata. You will create your first HTML document from scratch.',
    'https://example.com/videos/html-structure',
    1200,
    false,
    1
  ),
  (
    (SELECT id FROM public.sections WHERE title = 'HTML Fundamentals' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass')),
    'Working with Text Elements',
    'Use headings, paragraphs, lists, and other text elements to structure your content.',
    'In this lesson, you will learn how to work with various text elements in HTML, including headings, paragraphs, lists, emphasis, and more. You will practice creating well-structured content that is both human-readable and semantically meaningful.',
    'https://example.com/videos/html-text',
    1500,
    false,
    2
  ),
  (
    (SELECT id FROM public.sections WHERE title = 'CSS Styling' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass')),
    'CSS Selectors and Properties',
    'Learn how to target HTML elements and apply styles to them.',
    'This lesson introduces CSS selectors and properties, teaching you how to target specific HTML elements and apply styles to them. You will learn about the cascade, specificity, and inheritance in CSS.',
    'https://example.com/videos/css-selectors',
    1800,
    false,
    1
  ),
  (
    (SELECT id FROM public.sections WHERE title = 'CSS Styling' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass')),
    'Layout with Flexbox',
    'Create flexible layouts using CSS Flexbox.',
    'In this lesson, you will learn how to use CSS Flexbox to create flexible, responsive layouts. You will build several common UI patterns using Flexbox and understand when to use it in your designs.',
    'https://example.com/videos/flexbox',
    2100,
    false,
    2
  ),
  (
    (SELECT id FROM public.sections WHERE title = 'JavaScript Essentials' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass')),
    'JavaScript Syntax and Variables',
    'Learn the basics of JavaScript syntax, variables, and data types.',
    'This lesson covers the fundamentals of JavaScript, including syntax, variables, data types, and operators. You will write your first JavaScript programs and see how to integrate them with HTML and CSS.',
    'https://example.com/videos/js-syntax',
    1800,
    false,
    1
  ),
  (
    (SELECT id FROM public.sections WHERE title = 'JavaScript Essentials' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass')),
    'DOM Manipulation',
    'Learn how to interact with the Document Object Model (DOM).',
    'In this lesson, you will learn how to use JavaScript to interact with the DOM, allowing you to dynamically modify the content, structure, and style of web pages. You will build interactive features that respond to user actions.',
    'https://example.com/videos/dom',
    2100,
    false,
    2
  );

-- Create resources for the web development course
INSERT INTO public.resources (lesson_id, title, description, file_url, file_type, file_size) VALUES
  (
    (SELECT id FROM public.lessons WHERE title = 'Setting Up Your Development Environment' AND section_id = (SELECT id FROM public.sections WHERE title = 'Introduction to Web Development' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'))),
    'Development Environment Setup Guide',
    'A detailed guide on setting up your web development environment.',
    'https://example.com/files/setup-guide.pdf',
    'PDF',
    2048000
  ),
  (
    (SELECT id FROM public.lessons WHERE title = 'HTML Document Structure' AND section_id = (SELECT id FROM public.sections WHERE title = 'HTML Fundamentals' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'))),
    'HTML Template Starter',
    'A starter template for HTML projects with best practices.',
    'https://example.com/files/html-template.zip',
    'ZIP',
    1024000
  ),
  (
    (SELECT id FROM public.lessons WHERE title = 'Working with Text Elements' AND section_id = (SELECT id FROM public.sections WHERE title = 'HTML Fundamentals' AND course_id = (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'))),
    'HTML Cheat Sheet',
    'A quick reference for common HTML elements and attributes.',
    'https://example.com/files/html-cheatsheet.pdf',
    'PDF',
    1536000
  );

-- Create course-level resources
INSERT INTO public.resources (course_id, title, description, file_url, file_type, file_size) VALUES
  (
    (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'),
    'Course Syllabus',
    'Complete course syllabus with learning objectives and milestone projects.',
    'https://example.com/files/syllabus.pdf',
    'PDF',
    1024000
  ),
  (
    (SELECT id FROM public.courses WHERE slug = 'web-development-masterclass'),
    'Web Developer Roadmap',
    'A comprehensive roadmap for becoming a full-stack web developer.',
    'https://example.com/files/roadmap.pdf',
    'PDF',
    2048000
  ); 