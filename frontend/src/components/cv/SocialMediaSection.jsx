const SocialMediaSection = ({ socials }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-700 mb-2">Social Media</h2>
    <div className="flex space-x-4">
      {socials &&
        Object.entries(socials).map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)} <ExternalLink size={16} className="ml-1" />
          </a>
        ))}
    </div>
  </div>
);

export default SocialMediaSection;
