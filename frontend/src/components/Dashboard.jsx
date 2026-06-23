import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

const Dashboard = () => {
  const data = JSON.parse(localStorage.getItem("resumeData"));

  if (!data) return <div>No Data Found</div>;

  // ---------------- BASIC METRICS ----------------
  const totalSkills = data.skills?.length || 0;
  const experience = data.experience_years || 0;
  const atsScore = data.ats_score?.total_score || 0;

  const readiness =
    atsScore > 80 ? "Job Ready 🚀" :
    atsScore > 60 ? "Almost Ready ⚡" :
    "Needs Improvement 📚";

  // ---------------- SKILL PIE ----------------
  const skillPieData = data.skills.map(skill => ({
    name: skill,
    value: 1
  }));

  // ---------------- CAREER PATH ----------------
  const careerPaths = {
    beginner: ["Intern", "Junior Developer", "Software Engineer", "Senior Engineer"],
    data: ["Data Analyst", "Data Scientist", "ML Engineer"],
    fullstack: ["Frontend Dev", "Full Stack Dev", "Backend Engineer", "Architect"]
  };

  const detectTrack = () => {
    const skills = data.skills.join(" ").toLowerCase();

    if (skills.includes("sql") || skills.includes("pandas")) return "data";
    if (skills.includes("react") || skills.includes("node")) return "fullstack";
    return "beginner";
  };

  const selectedTrack = careerPaths[detectTrack()];

  // ---------------- JOB ROLES ----------------
  const jobRoles = [
    {
      role: "Full Stack Developer",
      match: 88,
      recommended: ["React", "Node.js", "MongoDB"],
      missing: ["Docker", "System Design"]
    },
    {
      role: "Data Analyst",
      match: 75,
      recommended: ["Python", "SQL", "Excel"],
      missing: ["Power BI"]
    }
  ];

  const bestRole = jobRoles.reduce((a, b) => (a.match > b.match ? a : b));

  // ---------------- IMPROVEMENTS ----------------
  const improvements = [];

  if (!data.summary) improvements.push("Add Professional Summary section");
  if (!data.projects?.length) improvements.push("Add Projects section");

  data.skill_gap?.forEach(skill => {
    improvements.push(`Learn ${skill} to improve ATS score`);
  });

  improvements.push("Use strong action verbs like 'developed', 'built', 'designed'");
  improvements.push("Keep resume 1–2 pages max for ATS optimization");

  // ---------------- PDF ----------------
  const downloadReport = () => {
    const doc = new (require("jspdf").jsPDF)();

    doc.text("AI Resume Report", 20, 20);
    doc.text(`ATS Score: ${atsScore}`, 20, 40);
    doc.text(`Experience: ${experience}`, 20, 50);
    doc.text(`Readiness: ${readiness}`, 20, 60);
    doc.text(`Best Role: ${bestRole.role}`, 20, 70);

    doc.save("resume-report.pdf");
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">

      <h1 className="text-4xl font-bold mb-6">AI Resume Dashboard</h1>

      {/* ---------------- TOP METRICS ---------------- */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p>Total Skills</p>
          <b>{totalSkills}</b>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p>Experience</p>
          <b>{experience} yrs</b>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p>ATS Score</p>
          <b>{atsScore}/100</b>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p>Readiness</p>
          <b>{readiness}</b>
        </div>

      </div>

      {/* ---------------- CHARTS ---------------- */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* SKILL PIE */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Skill Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={skillPieData} dataKey="value" nameKey="name" outerRadius={120} label>
                {skillPieData.map((_, i) => (
                  <Pie key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ATS BAR */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">ATS Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: "ATS", value: atsScore },
              { name: "Experience", value: experience * 10 },
              { name: "Skills", value: totalSkills * 5 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ---------------- CAREER PATH ---------------- */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Career Path Roadmap 🚀</h2>

        <div className="flex flex-wrap gap-3">
          {selectedTrack.map((role, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- IMPROVEMENTS ---------------- */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Resume Improvement Suggestions 📉</h2>

        <ul className="space-y-2">
          {improvements.map((item, i) => (
            <li key={i} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* DOWNLOAD */}
      <button
        onClick={downloadReport}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl"
      >
        Download Report
      </button>

    </div>
  );
};

export default Dashboard;