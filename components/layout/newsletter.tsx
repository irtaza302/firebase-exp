"use client";

import { useState } from "react";

interface NewsletterProps {
  className?: string;
}

export default function Newsletter({ className = "" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      // Success mock - in a real app, call your API here
      setStatus("success");
      setMessage("Thanks for subscribing! Check your email for confirmation.");
      setEmail("");
    }, 1500);
  };

  return (
    <section className={`bg-gray-50 py-16 ${className}`}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest courses, tutorials, and
            web development tips.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-grow">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
              />
            </div>
            <button
              type="submit"
              className={`px-6 py-3 font-medium rounded-lg text-white transition-colors ${
                status === "loading"
                  ? "bg-blue-400 cursor-not-allowed"
                  : status === "success"
                    ? "bg-green-600"
                    : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading"
                ? "Subscribing..."
                : status === "success"
                  ? "Subscribed!"
                  : "Subscribe"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-3 text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}
            >
              {message}
            </p>
          )}

          <p className="mt-3 text-xs text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
