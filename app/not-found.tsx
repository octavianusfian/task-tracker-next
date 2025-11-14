import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-500">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500 transition-colors duration-200"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
