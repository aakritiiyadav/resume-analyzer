const SuggestionsCard = ({ skills }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Skills Found</h2>

      <div className="flex flex-wrap gap-3">
        {skills?.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsCard;