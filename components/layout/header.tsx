"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { fetchUser, signOutUser, setUser } from "@/lib/redux/slices/auth-slice";
import { createClient } from "@/lib/supabase/client";

interface NavItemProps {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

const NavItem = ({ href, label, hasDropdown = false }: NavItemProps) => (
  <li className="relative group">
    <Link
      href={href}
      className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
    >
      {label}
      {hasDropdown && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1 h-4 w-4"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      )}
    </Link>
    {hasDropdown && (
      <div className="absolute left-0 mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
          <Link
            href="/courses/photoshop"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Photoshop Courses
          </Link>
          <Link
            href="/courses/illustrator"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Illustrator Courses
          </Link>
          <Link
            href="/courses/web-design"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Web Design
          </Link>
          <Link
            href="/courses/video-editing"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Video Editing
          </Link>
        </div>
      </div>
    )}
  </li>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data on component mount
    dispatch(fetchUser());

    // Set up auth state change listener
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        // Update Redux store with the new user data
        if (session?.user) {
          dispatch(setUser(session.user));
        }
      }

      if (event === "SIGNED_OUT") {
        // Clear user data from Redux store
        dispatch(setUser(null));
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  const handleSignOut = async () => {
    await dispatch(signOutUser());
    router.push("/");
  };

  const userName = user?.user_metadata?.first_name
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`
    : user?.email?.split("@")[0];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                BootRocket
              </span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-2">
              <NavItem href="/courses" label="Courses" hasDropdown />
              <NavItem href="/about" label="About" />
              <NavItem href="/pricing" label="Pricing" />
              <NavItem href="/blog" label="Blog" />
              <NavItem href="/contact" label="Contact" />
            </ul>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading &&
              (user ? (
                <div className="flex items-center">
                  <div className="relative group">
                    <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none transition-colors">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-600">
                        {userName ? userName.charAt(0).toUpperCase() : "?"}
                      </div>
                      <span>{userName}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1 h-4 w-4"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Your Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/auth">Log in</Link>
                  </Button>
                  <Button variant="accent" size="sm" asChild>
                    <Link href="/auth">Sign up</Link>
                  </Button>
                </>
              ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/courses"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {!isLoading &&
              (user ? (
                <div className="px-4 py-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                      {userName ? userName.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div>
                      <div className="text-base font-medium text-gray-800">
                        {userName}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-2 space-y-1">
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    asChild
                  >
                    <Link href="/auth">Log in</Link>
                  </Button>
                  <Button
                    variant="accent"
                    className="w-full justify-center mt-2"
                    asChild
                  >
                    <Link href="/auth">Sign up</Link>
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
