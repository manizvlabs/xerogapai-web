// This file forces Tailwind to include dark mode classes
// It's not used in the app but ensures the classes are generated

export default function DarkModeTest() {
  return (
    <div className="hidden">
      {/* Force Tailwind to include these dark mode classes */}
      <div className="bg-white dark:bg-gray-900"></div>
      <div className="bg-gray-800 dark:bg-gray-700"></div>
      <div className="text-white dark:text-gray-100"></div>
      <div className="text-gray-300 dark:text-gray-900"></div>
      <div className="border-gray-200 dark:border-gray-700"></div>
      <div className="border-gray-600 dark:border-gray-600"></div>
      <div className="hover:bg-gray-200 dark:hover:bg-gray-700"></div>
      <div className="hover:bg-gray-600 dark:hover:bg-gray-600"></div>
    </div>
  );
}
