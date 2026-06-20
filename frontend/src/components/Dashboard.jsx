export default function Dashboard({ data, onReset }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Resume Analysis Result</h1>

      <div className="bg-slate-900 p-6 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">ATS Score</h2>
        <p className="text-4xl text-violet-400">{data.ats_score.total}/100</p>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills Found</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span key={index} className="bg-green-600 px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Skill Gap</h2>
        <div className="flex flex-wrap gap-2">
          {data.skill_gap.map((skill, index) => (
            <span key={index} className="bg-red-600 px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Recommended Jobs</h2>
        {data.matched_jobs.map((job, index) => (
          <div key={index} className="border-b border-slate-700 py-3">
            <p className="font-bold">{job.role}</p>
            <p className="text-violet-400">{job.match_percent}% match</p>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="bg-violet-600 px-6 py-3 rounded-lg"
      >
        Analyze Another Resume
      </button>
    </div>
  );
}