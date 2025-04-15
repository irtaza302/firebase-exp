# BootRocket

A comprehensive website for creative courses and tutorials built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Next.js 15+ application with server and client components
- TypeScript with strict mode for type safety
- Supabase for authentication and data storage
- Edge Functions for server-side authentication handling
- User profile management
- Responsive design with Tailwind CSS
- Redux for state management
- Course catalog with filtering and search
- Instructor profiles and showcases
- Blog preview section
- Newsletter subscription
- Testimonials section

## Authentication Features

- Email and password authentication
- Profile creation on signup
- Password reset functionality
- Email verification
- Session management

## Setup

### 1. Clone the repository

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Start the development server

```bash
npm run dev
```

## Supabase Edge Functions

The project includes edge functions for server-side authentication handling:

- `auth-callback`: Handles user profile creation after signup
- `password-reset`: Facilitates password reset functionality

## Database Schema

The database includes the following tables:

### profiles

| Column     | Type              | Description                   |
| ---------- | ----------------- | ----------------------------- |
| id         | UUID              | Primary Key                   |
| user_id    | UUID              | Foreign Key to auth.users(id) |
| name       | TEXT              | User's full name              |
| avatar_url | TEXT              | URL to user's avatar image    |
| created_at | TIMESTAMP WITH TZ | Creation timestamp            |
| updated_at | TIMESTAMP WITH TZ | Last update timestamp         |

## Tech Stack

- **Framework**: Next.js 15.3.0
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4.x
- **State Management**: Redux with @reduxjs/toolkit
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Components**: Server components by default, client components where needed
- **Font**: Geist (configured via next/font)

## Project Structure

- `app/`: Pages and layouts using Next.js App Router
- `components/`: Reusable UI components
  - `layout/`: Layout components (header, footer, etc.)
  - `ui/`: Reusable UI elements (buttons, cards, etc.)
  - `courses/`: Course-related components
  - `home/`: Homepage-specific components
- `lib/`: Utilities and helpers including Redux store
- `public/`: Static assets

## Pages Implemented

1. Homepage with featured courses and testimonials
2. Courses listing page with filtering
3. Course detail pages
4. About page
5. Login/Register page

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font) font family.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Future Enhancements

Potential future enhancements for this project include:

- User dashboard/profile page
- Course progress tracking
- Payment integration
- Content management system integration
- Advanced search functionality with filtering
- Course ratings and reviews system
- Instructor application and onboarding
- Live webinar/workshop integration
