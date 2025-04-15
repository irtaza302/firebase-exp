"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAppDispatch } from "@/lib/redux/store";
import { setUser } from "@/lib/redux/slices/auth-slice";
import Link from "next/link";

// Client component that uses useSearchParams
function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const code = searchParams.get("code");

      if (code) {
        try {
          // Create a fresh Supabase client
          const supabase = createClient();

          // The issue is with the PKCE flow - first check if we have an existing session
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session) {
            // If we already have a session, user is already logged in
            dispatch(setUser(session.user));
            setVerificationStatus("success");

            setTimeout(() => {
              router.refresh();
              router.push("/");
            }, 3000);
          } else {
            // Need to exchange code for session
            const { data, error } =
              await supabase.auth.exchangeCodeForSession(code);

            if (error) {
              throw error;
            }

            // Update Redux store with the user data
            if (data?.user) {
              dispatch(setUser(data.user));
              setVerificationStatus("success");

              setTimeout(() => {
                router.refresh();
                router.push("/");
              }, 3000);
            } else {
              throw new Error("User data not found");
            }
          }
        } catch (error) {
          console.error("Error exchanging code for session:", error);
          setVerificationStatus("error");

          // Extract the actual error message
          const errorMsg =
            error instanceof Error ? error.message : "Authentication failed";

          setErrorMessage(
            errorMsg.includes(
              "both auth code and code verifier should be non-empty",
            )
              ? "Authentication failed: The verification link may have expired or been used already. Please try signing up again."
              : errorMsg,
          );
        }
      } else {
        // If no code in URL, redirect to auth page
        router.push("/auth");
      }
    };

    handleAuthCallback();
  }, [searchParams, router, dispatch]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <div className="text-center">
          {verificationStatus === "verifying" && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Verifying your account...
              </h1>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
              <p className="mt-4 text-gray-600">
                Please wait while we validate your credentials.
              </p>
            </>
          )}

          {verificationStatus === "success" && (
            <>
              <svg
                className="h-16 w-16 text-green-500 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Email Verified!
              </h1>
              <p className="text-gray-600 mb-4">
                Your email has been successfully verified. You are now signed
                in.
              </p>
              <p className="text-gray-600">
                Redirecting you to the homepage...
              </p>
            </>
          )}

          {verificationStatus === "error" && (
            <>
              <svg
                className="h-16 w-16 text-red-500 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Failed
              </h1>
              <p className="text-gray-600 mb-4">
                {errorMessage || "There was a problem verifying your email."}
              </p>
              <Link
                href="/auth"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Return to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function CallbackLoading() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackLoading />}>
      <AuthCallbackContent />
    </Suspense>
  );
}
