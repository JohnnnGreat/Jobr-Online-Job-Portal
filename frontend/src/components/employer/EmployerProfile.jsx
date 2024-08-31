import React from "react";
import { Link } from "react-router-dom";

const EmployerProfile = ({ employer }) => (
  <section className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-bold mb-4">Employer Profile</h2>
    {employer ? (
      <div>
        {employer.logo && (
          <img
            src={employer.logo}
            alt={`${employer.companyName} Logo`}
            className="w-24 h-24 rounded-full mb-4"
          />
        )}
        <h3 className="text-xl font-semibold">{employer.companyName}</h3>
        <p className="text-gray-600">{employer.description}</p>
        <p className="text-gray-600 mt-2">
          <strong>Email:</strong> {employer.email}
        </p>
        <p className="text-gray-600">
          <strong>Website:</strong>{" "}
          <Link
            to={employer.website}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {employer.website}
          </Link>
        </p>
      </div>
    ) : (
      <p>Loading employer data...</p>
    )}
  </section>
);

export default EmployerProfile;
