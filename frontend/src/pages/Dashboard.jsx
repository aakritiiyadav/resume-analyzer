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
import { 
  Award, 
  GraduationCap, 
  Star, 
  Map, 
  Briefcase, 
  Sliders, 
  Download, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Brain
} from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ["#7C3AED", "#9333EA", "#C084FC", "#E9D5FF", "#A78BFA"];

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
      <div className="min-h-screen flex flex-col justify-center items-center text-lg gap-4 bg-gradient-to-b from-[#F9F6FC] to-[#F5EFFF]">
        <Brain className="h-16 w-16 text-[#7C3AED] animate-float" />
        <h2 className="text-xl font-bold text-[#2D1A47]">No Resume Data Found</h2>
        <p className="text-gray-500 text-sm">Please upload a resume first to view the dashboard.</p>
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

  const skillPieData =
    data.skills?.map((skill, index) => ({
      name: skill,
      value: [20, 15, 10, 12, 8, 18, 17][index % 7]
    })) || [];

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

  const jobRoles = [
    {
      role: "Frontend Developer",
      match: 82,
      recommended: ["React", "JavaScript", "CSS", "HTML"],
      missing: ["TypeScript"]
    },
    {
      role: "Backend Developer",
      match: 75,
      recommended: ["Python", "FastAPI", "SQL"],
      missing: ["Docker", "AWS"]
    },
    {
      role: "Data Analyst",
      match: 70,
      recommended: ["Python", "SQL", "Excel", "Pandas"],
      missing: ["Power BI", "Tableau"]
    }
  ];
  const bestRole = jobRoles.reduce((a, b) => (a.match > b.match ? a : b));

  const skillDatabase = [
    "html", "css", "javascript", "typescript", "react", "node", "express", "mongodb", "mysql", "sql",
    "python", "java", "c++", "pandas", "numpy", "machine learning", "deep learning", "tensorflow",
    "docker", "aws", "git", "github", "excel", "power bi", "tableau", "fastapi", "rest api",
  ];

  const analyzeJD = () => {
    const text = jdText.toLowerCase();
    const resumeSkills = skills.map(skill => skill.toLowerCase());
    const requiredSkills = skillDatabase.filter(skill => text.includes(skill));
    const matchedSkills = requiredSkills.filter(skill => resumeSkills.includes(skill));
    const missingSkills = requiredSkills.filter(skill => !resumeSkills.includes(skill));
    const recommendedSkills = skillDatabase
      .filter(skill => !resumeSkills.includes(skill) && !missingSkills.includes(skill))
      .slice(0, 5);

    const matchPercent = requiredSkills.length
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 0;

    const difficulty = requiredSkills.length > 10 ? "Hard" : requiredSkills.length > 5 ? "Medium" : "Easy";
    const readiness = matchPercent >= 80 ? "Job Ready 🚀" : matchPercent >= 60 ? "Almost Ready ⚡" : "Needs Improvement 📚";
    const recommendation = matchPercent >= 80 ? "✅ Apply Immediately" : matchPercent >= 60 ? "⚠️ Apply & Upskill" : "❌ Improve Skills First";

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

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("AI Resume Intelligence Report", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`ATS Score: ${atsScore}%`, 20, 40);
    doc.text(`Experience: ${experience} years`, 20, 50);
    doc.text(`Readiness Status: ${readiness}`, 20, 60);
    doc.text(`Best Matched Role: ${bestRole.role} (${bestRole.match}% Match)`, 20, 70);
    doc.save("resume-report.pdf");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F6FC] to-[#F5EFFF] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#2D1A47]">
              AI Resume Dashboard
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
              Analysis based on uploaded resume content and industry matching standards.
            </p>
          </div>
          
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-purple text-white font-bold text-xs shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Download className="h-4 w-4" /> Download PDF Report
          </button>
        </div>

        {/* ---------------- TOP STATS ---------------- */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div className="glass-card p-6 border border-white/60 shadow-sm" variants={itemVariants}>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Total Skills</p>
            <h2 className="text-4xl font-extrabold text-[#7C3AED]">{totalSkills}</h2>
          </motion.div>

          <motion.div className="glass-card p-6 border border-white/60 shadow-sm" variants={itemVariants}>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Experience</p>
            <h2 className="text-4xl font-extrabold text-[#7C3AED]">{experience} <span className="text-lg font-bold">yrs</span></h2>
          </motion.div>

          <motion.div className="glass-card p-6 border border-white/60 shadow-sm" variants={itemVariants}>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">ATS Score</p>
            <h2 className="text-4xl font-extrabold text-emerald-600">{atsScore}%</h2>
          </motion.div>

          <motion.div className="glass-card p-6 border border-white/60 shadow-sm" variants={itemVariants}>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Readiness</p>
            <h2 className="text-base md:text-lg font-bold text-[#2D1A47] mt-1">{readiness}</h2>
          </motion.div>
        </motion.div>

        {/* ---------------- CHARTS ---------------- */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="glass-panel p-6 border border-white/80 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#2D1A47] flex items-center gap-2">
              <Award className="h-5 w-5 text-[#7C3AED]" /> Skill Distribution
            </h2>
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillPieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {skillPieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 border border-white/80 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#2D1A47] flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#7C3AED]" /> ATS Benchmark
            </h2>
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "ATS Score", value: atsScore },
                    { name: "Skills Count", value: Math.min(totalSkills * 4, 100) },
                    { name: "Exp Metric", value: Math.min(experience * 8, 100) },
                  ]}
                  margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(216, 180, 254, 0.2)" />
                  <XAxis dataKey="name" stroke="#5B4F73" fontSize={12} />
                  <YAxis stroke="#5B4F73" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ---------------- EDUCATION & MATCHING ROLE ---------------- */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="glass-card p-8 border border-white/60 shadow-md flex items-start gap-4">
            <div className="h-12 w-12 bg-purple-100 text-[#7C3AED] flex items-center justify-center rounded-xl shadow-sm flex-shrink-0">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2D1A47] mb-2">Education 🎓</h2>
              <p className="text-base text-gray-700 font-medium leading-relaxed">
                {Array.isArray(data.education) && data.education.length > 0
                  ? data.education[0]
                  : "Education credentials not explicitly detected."}
              </p>
            </div>
          </div>

          <div className="glass-card p-8 border-l-4 border-l-emerald-400 border border-white/60 shadow-md flex items-start gap-4">
            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl shadow-sm flex-shrink-0">
              <Star className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-800 mb-1">Best Matching Role ⭐</h2>
              <div className="text-2xl font-extrabold text-[#2D1A47] mt-1">{bestRole.role}</div>
              <div className="mt-2 text-emerald-600 text-sm font-bold flex items-center gap-1">
                <span>Match Score: {bestRole.match}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- ROADMAP ---------------- */}
        <div className="glass-card p-8 border border-white/60 shadow-md mb-10">
          <h2 className="text-xl font-bold text-[#2D1A47] mb-5 flex items-center gap-2">
            <Map className="h-5 w-5 text-[#7C3AED]" /> Recommended Career Path Roadmap
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            {selectedTrack.map((role, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-purple-100/60 border border-purple-200/50 text-[#7C3AED] px-5 py-3 font-semibold text-sm shadow-sm rounded-none">
                  {role}
                </div>
                {index < selectedTrack.length - 1 && (
                  <span className="mx-2 text-purple-300 font-extrabold text-lg">➔</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- JOB ROLE MATCHING ---------------- */}
        <div className="glass-card p-8 border border-white/60 shadow-md mb-10">
          <h2 className="text-xl font-bold text-[#2D1A47] mb-6 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#7C3AED]" /> Job Role Analysis & Skill Checks
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {jobRoles.map((job, index) => (
              <div key={index} className="bg-white/40 border border-purple-100/50 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#2D1A47] mb-1">{job.role}</h3>
                  <div className="text-emerald-600 font-bold text-xs uppercase tracking-wider mb-4">
                    {job.match}% Match Fit
                  </div>

                  {/* Recommended */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Matched Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {job.recommended.map((skill, i) => (
                        <span key={i} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing */}
                  {job.missing?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Missing Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {job.missing.map((skill, i) => (
                          <span key={i} className="bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- JD ANALYZER ---------------- */}
        <div className="glass-panel p-8 border border-white/80 shadow-md">
          <h2 className="text-xl font-bold text-[#2D1A47] mb-2 flex items-center gap-2">
            <Sliders className="h-5 w-5 text-[#7C3AED]" /> Job Description (JD) Fit Analyzer
          </h2>
          <p className="text-xs text-gray-500 font-medium mb-6">
            Paste a target job description below. The AI will cross-reference it with your resume and calculate your immediate job readiness.
          </p>

          <textarea
            rows={5}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            className="w-full glass-input p-4 text-sm resize-none focus:ring-4 focus:ring-purple-100"
            placeholder="Paste description requirements here (e.g., 'Looking for a Python Developer with React and Docker experience...')"
          />

          <button
            onClick={analyzeJD}
            className="mt-4 px-6 py-3.5 bg-gradient-purple text-white font-bold text-xs shadow-sm hover:shadow-md transition duration-300"
          >
            Analyze JD Match
          </button>

          {jdResult && (
            <motion.div 
              className="grid md:grid-cols-3 gap-6 mt-8 border-t border-purple-100/50 pt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-emerald-50/50 border border-emerald-100 p-5">
                <h3 className="font-bold text-sm text-emerald-800 mb-1">Job Readiness</h3>
                <p className="text-lg font-bold text-emerald-700">{jdResult.readiness}</p>
              </div>

              <div className="bg-purple-50/50 border border-purple-100 p-5">
                <h3 className="font-bold text-sm text-purple-800 mb-1">Match Percentage</h3>
                <p className="text-2xl font-extrabold text-purple-700">{jdResult.matchPercent}%</p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 p-5">
                <h3 className="font-bold text-sm text-blue-800 mb-1">Recommendation</h3>
                <p className="text-sm font-semibold text-blue-700">{jdResult.recommendation}</p>
              </div>

              <div className="bg-white/40 border border-purple-100/30 p-5 md:col-span-2">
                <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-2">Required skills in JD</h3>
                <p className="text-sm text-gray-700 font-semibold">{jdResult.requiredSkills.join(", ") || "No matching database skills found in text."}</p>
              </div>

              <div className="bg-red-50/40 border border-red-100 p-5 md:col-span-1">
                <h3 className="font-bold text-xs text-red-700 uppercase tracking-wider mb-2">Missing Skills</h3>
                <p className="text-sm text-red-600 font-bold">{jdResult.missingSkills.join(", ") || "None! You are fully qualified."}</p>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;