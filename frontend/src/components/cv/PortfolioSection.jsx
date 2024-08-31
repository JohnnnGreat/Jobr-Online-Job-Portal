import React from "react";

const PortfolioSection = ({ portfolio }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-2">Portfolio</h2>
    <a
      href={portfolio}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 flex items-center"
    >
      {portfolio} <ExternalLink size={16} className="ml-1" />
    </a>
  </div>
);

export default PortfolioSection;
