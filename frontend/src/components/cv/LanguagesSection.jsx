

const LanguagesSection = ({ languages }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-2">Languages</h2>
    <div className="flex flex-wrap">
      {languages.map((language, index) => (
        <span
          key={index}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
        >
          {language}
        </span>
      ))}
    </div>
  </div>
);

export default LanguagesSection;
