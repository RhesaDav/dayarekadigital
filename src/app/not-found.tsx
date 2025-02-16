import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h2 className="text-4xl font-bold text-gray-800">404 - Not Found</h2>
      <p className="text-gray-500 mt-2">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/home"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
