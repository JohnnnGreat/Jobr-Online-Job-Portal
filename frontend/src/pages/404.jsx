/* eslint-disable react/no-unescaped-entities */
// src/NotFound.js

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="max-w-sm p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-gray-600">Oops! The page you're looking for does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
