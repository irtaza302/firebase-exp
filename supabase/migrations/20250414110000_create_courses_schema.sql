-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  long_description TEXT,
  thumbnail_url TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create categories table for course categorization
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create course_categories junction table
CREATE TABLE public.course_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(course_id, category_id)
);

-- Create instructors table
CREATE TABLE public.instructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create course_instructors junction table
CREATE TABLE public.course_instructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES public.instructors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(course_id, instructor_id)
);

-- Create sections table (for grouping lessons)
CREATE TABLE public.sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  video_url TEXT,
  duration INTEGER, -- in seconds
  is_free BOOLEAN DEFAULT false,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create resources table (downloadable files, attachments)
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE, -- can be attached to course overall
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER, -- in bytes
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK ((lesson_id IS NOT NULL) OR (course_id IS NOT NULL)) -- must be attached to either lesson or course
);

-- Create user_progress table to track completion
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  last_watched_position INTEGER DEFAULT 0, -- in seconds
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create user_subscriptions table 
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'expired')),
  subscription_start TIMESTAMPTZ NOT NULL,
  subscription_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create contact_messages table for user inquiries
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- optional, only for logged-in users
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Read policies
CREATE POLICY "Allow public read access to published courses" 
ON public.courses FOR SELECT USING (published = true);

CREATE POLICY "Allow public read access to categories" 
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Allow public read access to course_categories" 
ON public.course_categories FOR SELECT USING (true);

CREATE POLICY "Allow public read access to instructors" 
ON public.instructors FOR SELECT USING (true);

CREATE POLICY "Allow public read access to course_instructors" 
ON public.course_instructors FOR SELECT USING (true);

CREATE POLICY "Allow public read access to sections of published courses" 
ON public.sections FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.courses WHERE courses.id = sections.course_id AND courses.published = true));

CREATE POLICY "Allow public read access to free lessons" 
ON public.lessons FOR SELECT 
USING (
  is_free = true OR 
  EXISTS (
    SELECT 1 FROM public.user_subscriptions 
    WHERE user_subscriptions.user_id = auth.uid() 
    AND user_subscriptions.status = 'active'
    AND (user_subscriptions.subscription_end IS NULL OR user_subscriptions.subscription_end > now())
  )
);

CREATE POLICY "Allow public read access to free resources" 
ON public.resources FOR SELECT 
USING (
  (lesson_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.lessons WHERE lessons.id = resources.lesson_id AND lessons.is_free = true
  )) OR
  EXISTS (
    SELECT 1 FROM public.user_subscriptions 
    WHERE user_subscriptions.user_id = auth.uid() 
    AND user_subscriptions.status = 'active'
    AND (user_subscriptions.subscription_end IS NULL OR user_subscriptions.subscription_end > now())
  )
);

CREATE POLICY "Allow users to manage their own progress" 
ON public.user_progress FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Allow users to view their own subscriptions" 
ON public.user_subscriptions FOR SELECT USING (user_id = auth.uid());

-- Contact messages policies
CREATE POLICY "Allow authenticated users to create contact messages" 
ON public.contact_messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to view their own contact messages" 
ON public.contact_messages FOR SELECT USING (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX idx_courses_slug ON public.courses(slug);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_sections_course_id ON public.sections(course_id);
CREATE INDEX idx_lessons_section_id ON public.lessons(section_id);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON public.user_progress(lesson_id);
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_resources_lesson_id ON public.resources(lesson_id);
CREATE INDEX idx_resources_course_id ON public.resources(course_id);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers for all tables with that column
CREATE TRIGGER handle_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_instructors_updated_at
BEFORE UPDATE ON public.instructors
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_sections_updated_at
BEFORE UPDATE ON public.sections
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_lessons_updated_at
BEFORE UPDATE ON public.lessons
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_resources_updated_at
BEFORE UPDATE ON public.resources
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_user_progress_updated_at
BEFORE UPDATE ON public.user_progress
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_user_subscriptions_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at(); 