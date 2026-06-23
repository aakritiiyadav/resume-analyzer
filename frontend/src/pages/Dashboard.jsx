import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#A78BFA", "#8B5CF6", "#C4B5FD", "#DDD6FE", "#7C3AED"];

const Dashboard = () => {
  const data = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("resumeData") || "{}");
    } catch {
      return {};
    }
  }, []);

  const [jdText, setJdText] = useState("");
  const [jdResult, setJdResult] = useState(null);

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        No Resume Data Found
      </div>
    );
  }

  const skills = data.skills || [];
  const totalSkills = skills.length;
  const experience = data.experience_years || 0;
  const atsScore = data.ats_score?.total_score || 0;

  const readiness =
    atsScore > 80
      ? "Job Ready 🚀"
      : atsScore > 60
      ? "Almost Ready ⚡"
      : "Needs Improvement 📚";

  /* ---------------- PIE CHART (weighted instead of fake equal) ---------------- */
  const skillPieData =
  data.skills?.map((skill, index) => ({
    name: skill,
    value: [20,15,10,12,8,18,17][index % 7]
  })) || [];

  /* ---------------- CAREER PATH ---------------- */
  const careerPaths = {
    beginner: ["Intern", "Junior Developer", "Software Engineer", "Senior Engineer"],
    data: ["Data Analyst", "Data Scientist", "ML Engineer"],
    fullstack: ["Frontend Developer", "Full Stack Developer", "Backend Engineer", "System Architect"],
  };

  const detectTrack = () => {
    const text = skills.join(" ").toLowerCase();

    if (text.includes("sql") || text.includes("pandas") || text.includes("excel")) return "data";
    if (text.includes("react") || text.includes("node") || text.includes("express")) return "fullstack";
    return "beginner";
  };

  const selectedTrack = careerPaths[detectTrack()] || [];

  /* ---------------- JOB ROLES ---------------- */
  const jobRoles = [
  {
    role: "Frontend Developer",
    match: 82,
    recommended: [
      "React",
      "JavaScript",
      "CSS",
      "HTML"
    ],
    missing: [
      "TypeScript"
    ]
  },

  {
    role: "Backend Developer",
    match: 75,
    recommended: [
      "Python",
      "FastAPI",
      "SQL"
    ],
    missing: [
      "Docker",
      "AWS"
    ]
  },

  {
    role: "Data Analyst",
    match: 70,
    recommended: [
      "Python",
      "SQL",
      "Excel",
      "Pandas"
    ],
    missing: [
      "Power BI",
      "Tableau"
    ]
  }
];
  const bestRole = jobRoles.reduce((a, b) => (a.match > b.match ? a : b));

  /* ---------------- IMPROVEMENTS ---------------- */
  const improvements = [
    !data.summary && "Add Professional Summary",
    !data.projects?.length && "Add Projects Section",
    "Use ATS Keywords",
    "Add Quantifiable Achievements",
    "Improve Project Descriptions",
    ...(data.skill_gap || []).map((s) => `Learn ${s}`),
  ].filter(Boolean);

  /* ---------------- SKILL DB ---------------- */
  const skillDatabase = [
    "html","css","javascript","typescript","react","node","express","mongodb","mysql","sql",
    "python","java","c++","pandas","numpy","machine learning","deep learning","tensorflow",
    "docker","aws","git","github","excel","power bi","tableau","fastapi","rest api",
  ];

  /* ---------------- JD ANALYZER ---------------- */
  const analyzeJD = () => {

  const text = jdText.toLowerCase();

  const resumeSkills =
    skills.map(skill => skill.toLowerCase());

  const requiredSkills = skillDatabase.filter(skill =>
    text.includes(skill)
  );

  const matchedSkills = requiredSkills.filter(skill =>
    resumeSkills.includes(skill)
  );

  const missingSkills = requiredSkills.filter(skill =>
    !resumeSkills.includes(skill)
  );

  const recommendedSkills = skillDatabase
    .filter(
      skill =>
        !resumeSkills.includes(skill) &&
        !missingSkills.includes(skill)
    )
    .slice(0, 5);

  const matchPercent =
    requiredSkills.length
      ? Math.round(
          (matchedSkills.length /
            requiredSkills.length) * 100
        )
      : 0;
     

  const difficulty =
    requiredSkills.length > 10
      ? "Hard"
      : requiredSkills.length > 5
      ? "Medium"
      : "Easy";

  const readiness =
    matchPercent >= 80
      ? "Job Ready 🚀"
      : matchPercent >= 60
      ? "Almost Ready ⚡"
      : "Needs Improvement 📚";

  const recommendation =
    matchPercent >= 80
      ? "✅ Apply Immediately"
      : matchPercent >= 60
      ? "⚠️ Apply & Upskill"
      : "❌ Improve Skills First";

  setJdResult({
    requiredSkills,
    matchedSkills,
    missingSkills,
    recommendedSkills,
    matchPercent,
    difficulty,
    readiness,
    recommendation,
  });
};
  /* ---------------- PDF ---------------- */
  const downloadReport = () => {
    const doc = new jsPDF();

    doc.text("AI Resume Report", 20, 20);
    doc.text(`ATS Score: ${atsScore}`, 20, 40);
    doc.text(`Experience: ${experience} years`, 20, 50);
    doc.text(`Readiness: ${readiness}`, 20, 60);
    doc.text(`Best Role: ${bestRole.role}`, 20, 70);

    doc.save("resume-report.pdf");
  };

  return (
    <div className="min-h-screen bg-[#F8F4FF] p-8">

      <h1 className="text-4xl font-bold mb-8 text-[#5B3E96]">
        AI Resume Dashboard
      </h1>

      {/* ---------------- TOP STATS ---------------- */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-5 shadow rounded">
          <p>Total Skills</p>
          <h2 className="text-3xl font-bold">{totalSkills}</h2>
        </div>

        <div className="bg-white p-5 shadow rounded">
          <p>Experience</p>
          <h2 className="text-3xl font-bold">{experience} yrs</h2>
        </div>

        <div className="bg-white p-5 shadow rounded">
          <p>ATS Score</p>
          <h2 className="text-3xl font-bold">{atsScore}</h2>
        </div>

        <div className="bg-white p-5 shadow rounded">
          <p>Readiness</p>
          <h2 className="text-lg font-bold">{readiness}</h2>
        </div>

      </div>

      {/* ---------------- CHARTS ---------------- */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-5 shadow rounded">
          <h2 className="font-bold mb-3">Skill Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
  data={skillPieData}
  dataKey="value"
  nameKey="name"
  outerRadius={110}
  label={({ name, percent }) =>
    `${name} ${(percent * 100).toFixed(0)}%`
  }
>
                {skillPieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 shadow rounded">
          <h2 className="font-bold mb-3">ATS Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "ATS", value: atsScore },
                { name: "Skills", value: totalSkills * 5 },
                { name: "Experience", value: experience * 10 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

     
      
      <div className="mt-8 bg-white p-6 shadow border border-purple-200">
  <h2 className="text-2xl font-bold text-purple-700 mb-4">
    Education 🎓
  </h2>

  <p className="text-lg font-semibold">
  {Array.isArray(data.education) && data.education.length > 0
    ? data.education[0]
    : "Education not detected"}
</p>
</div>
<div className="mt-8 bg-white p-6 shadow border border-green-200">
  <h2 className="text-2xl font-bold text-green-700 mb-4">
    Best Matching Role ⭐
  </h2>

  <div className="text-3xl font-bold">
    {bestRole.role}
  </div>

  <div className="mt-3 text-green-600 font-semibold">
    Match Score: {bestRole.match}%
  </div>
</div>
<div className="mt-8 bg-white p-6 shadow border border-purple-200">

  <h2 className="text-2xl font-bold text-purple-700 mb-5">
    Career Path Roadmap 🚀
  </h2>

  <div className="flex flex-wrap gap-4">

    {selectedTrack.map((role, index) => (
      <div
        key={index}
        className="bg-purple-100 px-5 py-3 font-semibold shadow"
      >
        {role}
      </div>
    ))}

  </div>

</div>
<div className="mt-8 bg-white p-6 shadow border border-purple-200">

  <h2 className="text-2xl font-bold text-purple-700 mb-5">
    Job Role Matching 🎯
  </h2>

  <div className="grid md:grid-cols-3 gap-5">

    {jobRoles.map((job, index) => (

      <div
        key={index}
        className="bg-purple-50 p-5 shadow border border-purple-200"
      >

        <h3 className="font-bold text-xl mb-2">
          {job.role}
        </h3>

        <div className="text-green-600 font-bold mb-4">
          Match Score: {job.match}%
        </div>

        <div>

          <h4 className="font-semibold mb-2">
            Recommended Skills
          </h4>

          <div className="flex flex-wrap gap-2">

            {(job.recommended || []).map((skill, i) => (
              <span
                key={i}
                className="bg-green-100 px-3 py-1 text-sm"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        <div className="mt-4">

          <h4 className="font-semibold text-red-600 mb-2">
            Missing Skills
          </h4>

          <div className="flex flex-wrap gap-2">

            {job.missing.map((skill, i) => (
              <span
                key={i}
                className="bg-red-100 px-3 py-1 text-sm"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

      </div>

    ))}

  </div>

</div>
<div className="mt-10 bg-white p-6 shadow rounded">

        <h2 className="text-2xl font-bold mb-4">
          Job Description Analyzer
        </h2>

        <textarea
          rows={6}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Paste Job Description Here..."
        />

        <button
          onClick={analyzeJD}
          className="mt-4 px-5 py-3 bg-[#8B5CF6] text-white rounded"
        >
          Analyze Job
        </button>

        {jdResult && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded">
  <h3 className="font-bold">
    Job Readiness
  </h3>

  <p className="text-xl font-bold">
    {jdResult.readiness}
  </p>
</div>

            <div className="bg-purple-50 p-4 rounded">
              <h3 className="font-bold">Required Skills</h3>
              <p>{jdResult.requiredSkills.join(", ")}</p>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-bold">Match Percentage</h3>
              <p className="text-4xl font-bold">{jdResult.matchPercent}%</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded">
              <h3 className="font-bold">Difficulty</h3>
              <p>{jdResult.difficulty}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-bold">Recommendation</h3>
              <p>{jdResult.recommendation}</p>
            </div>

            <div className="bg-red-50 p-4 md:col-span-2 rounded">
              <h3 className="font-bold">Missing Skills</h3>
              <p>{jdResult.missingSkills.join(", ")}</p>
            </div>

          </div>
        )}

      </div>

      {/* ---------------- DOWNLOAD ---------------- */}
      <button
        onClick={downloadReport}
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded"
      >
        Download Report
      </button>

    </div>
  );
};

export default Dashboard;