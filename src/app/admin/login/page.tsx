import type { Metadata } from "next";
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: "Admin Login - VyaptIX AI",
  description: "Secure access to VyaptIX AI admin panel for content management and website administration.",
};

export default function AdminLoginPage() {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-white">
            VyaptIX AI Content Management
          </p>
        </div>
      </div>

      <LoginForm />
    </div>
  );
}
