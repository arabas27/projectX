import React from "react";

export function meta() {
  return [{ title: "Login" }];
}

export default function Login() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const email = fd.get("email");
    // In a real app, call your auth API here.
    alert(`Logging in as ${email}`);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden md:flex md:items-stretch">
        {/* Left panel - illustration/branding (hidden on small screens) */}
        <div className="hidden md:block md:w-1/2 bg-linear-to-br from-indigo-500 to-sky-500 p-8 text-white">
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-2">Welcome back</h2>
            <p className="opacity-90">Sign in to continue to your account.</p>
            <div className="mt-6">
              <div className="w-full h-40 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">Illustration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel - form */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Sign in
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Use your email and password to sign in
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Username
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="ws00xxx"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={4}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••"
              />
            </div>

            <div className="flex flex-col space-y-3 text-sm">
              <label className="inline-flex items-center space-x-2">
                <input
                  name="remember"
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 dark:text-gray-200">
                  Remember me
                </span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
