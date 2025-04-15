"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();

        if (data?.user?.email) {
          setEmail(data.user.email);
        } else {
          setError(
            "Unable to verify user. Please try the reset password process again.",
          );
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(
          "Unable to verify user. Please try the reset password process again.",
        );
      }
    };

    fetchUserEmail();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setSuccess(true);

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/auth");
      }, 3000);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-md w-full p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Reset Your Password
        </h1>

        {email && (
          <p className="text-gray-600 mb-6">Setting new password for {email}</p>
        )}

        {success ? (
          <div className="bg-green-50 p-4 rounded-lg text-green-600">
            <p className="font-medium">Password reset successful!</p>
            <p className="mt-1">
              You will be redirected to the login page in a moment.
            </p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleResetPassword}>
            {error && (
              <div className="bg-red-50 p-4 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Create a new password"
                minLength={6}
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Confirm your new password"
                minLength={6}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-70"
              >
                {isLoading ? "Updating..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
