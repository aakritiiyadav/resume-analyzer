import { useState, useMemo, useContext } from "react";
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
  Brain,
  CheckSquare,
  HelpCircle,
  Copy,
  Sparkles,
  DollarSign,
  MapPin,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const COLORS = ["#7C3AED", "#9333EA", "#C084FC", "#E9D5FF", "#A78BFA"];

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const isLoggedIn = !!token;

  const data = useMemo(() => {
    try {
      const savedToken = localStorage.getItem("authToken");
      const key = savedToken ? "resumeData" : "tempResumeData";
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch {
      return {};
    }
  }, [token]);

  const [jdText, setJdText] = useState("");
  const [jdResult, setJdResult] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [copiedText, setCopiedText] = useState("");

  // New features states
  const [bulletInput, setBulletInput] = useState("");
  const [bulletOutput, setBulletOutput] = useState(null);
  const [copiedBulletType, setCopiedBulletType] = useState("");

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

  const jobRoles = data.matched_jobs || [
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
  // Helper mapping in case keys are "job_role" and "match_percentage" from backend
  const normalizedRoles = jobRoles.map(j => ({
    role: j.job_role || j.role,
    match: j.match_percentage || j.match,
    recommended: j.matched_skills || j.recommended || [],
    missing: j.missing_skills || j.missing || []
  }));

  const bestRole = normalizedRoles.length > 0 
    ? normalizedRoles.reduce((a, b) => (a.match > b.match ? a : b))
    : { role: "Software Engineer", match: 75, recommended: [], missing: [] };

  const skillDatabase = [
    "html", "css", "javascript", "typescript", "react", "node", "express", "mongodb", "mysql", "sql",
    "python", "java", "c++", "pandas", "numpy", "machine learning", "deep learning", "tensorflow",
    "docker", "aws", "git", "github", "excel", "power bi", "tableau", "fastapi", "rest api",
  ];

  /* ---------------- INTERACTIVE CHECKLIST ---------------- */
  const improvements = useMemo(() => {
    return [
      !data.summary && "Add a concise Professional Summary to the header",
      !data.projects?.length && "Add a Projects section displaying your best build work",
      "Insert industry-standard ATS Keywords matching your target roles",
      "Quantify your accomplishments using metrics (e.g. 'boosted speeds by 20%')",
      "Optimize sentence lengths and maintain a clean double-column layout",
      ...(data.skill_gap || []).map((s) => `Incorporate skill training for: ${s}`),
    ].filter(Boolean);
  }, [data]);

  const toggleChecklist = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const numChecked = Object.values(checkedItems).filter(Boolean).length;
  const projectedScore = Math.min(atsScore + numChecked * 4, 100);

  /* ---------------- DYNAMIC INTERVIEW PREP ---------------- */
  const interviewQuestions = useMemo(() => {
    const questionDB = {
      react: "How does the virtual DOM work in React, and how do lifecycle hooks compare to functional effect hooks?",
      javascript: "Explain event delegation in JS and how scoping (lexical, execution contexts) affects closure execution.",
      typescript: "Describe the differences between type interfaces and type aliases, and how union/intersection types behave.",
      python: "What is generator list comprehension, how does the yield keyword differ from return, and what are decorators?",
      fastapi: "Describe dependency injection in FastAPI and how you structure database session middlewares.",
      sql: "What is index optimization in SQL, and how do transactions manage concurrency isolation levels?",
      docker: "Explain container layer caching and how you write multi-stage Dockerfiles to minimize build size.",
      aws: "Describe VPC security groups versus network access control lists (NACLs) and how you architect IAM roles."
    };

    const detected = skills
      .map(s => s.toLowerCase())
      .filter(s => questionDB[s]);
    
    const questions = detected.map(s => ({
      skill: s.charAt(0).toUpperCase() + s.slice(1),
      question: questionDB[s]
    }));

    if (questions.length < 3) {
      questions.push({
        skill: "System Design",
        question: "How do you design a highly scalable and fault-tolerant file upload system in a distributed environment?"
      });
      questions.push({
        skill: "Behavioral",
        question: "Tell me about a time you had to deliver a critical feature under pressure. How did you align the team and handle bottlenecks?"
      });
      questions.push({
        skill: "General",
        question: "Explain your preferred method for managing database migration scripts between local and cloud production servers."
      });
    }

    return questions.slice(0, 3);
  }, [skills]);

  /* ---------------- LINKEDIN PROFILE OPTIMIZER ---------------- */
  const linkedinHeadline = useMemo(() => {
    const capitalizedSkills = skills.slice(0, 3).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" | ");
    return `${bestRole.role} | Specializing in ${capitalizedSkills} | Optimizing systems and building high-performance solutions`;
  }, [bestRole, skills]);

  const linkedinAbout = useMemo(() => {
    const skillList = skills.slice(0, 5).join(", ");
    return `Results-driven ${bestRole.role} with hands-on experience in ${skillList}. Passionate about writing clean, maintainable code and solving complex technical challenges. Proven ability to adapt quickly to new technologies and collaborate effectively in team environments.`;
  }, [bestRole, skills]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(""), 2000);
  };

  /* ---------------- BULLET POINT OPTIMIZER HEURISTICS ---------------- */
  const handleEnhanceBullet = () => {
    if (!bulletInput.trim()) return;
    
    const text = bulletInput.trim().toLowerCase();
    
    let roleKeyword = "software architecture";
    if (text.includes("react") || text.includes("frontend") || text.includes("css") || text.includes("html") || text.includes("js")) {
      roleKeyword = "frontend components";
    } else if (text.includes("database") || text.includes("sql") || text.includes("backend") || text.includes("api") || text.includes("node")) {
      roleKeyword = "backend system";
    } else if (text.includes("data") || text.includes("python") || text.includes("ml") || text.includes("model")) {
      roleKeyword = "data analytics";
    }

    let action = "Spearheaded design and implementation of highly scalable systems, resulting in improved system reliability and developer velocity.";
    let metrics = "Optimized service execution flow and response protocols, slashing overall query latency by 35% and increasing processing capability.";
    let leadership = "Collaborated closely with cross-functional product stakeholders to architect and deliver core functionalities, reducing integration cycle time.";

    if (roleKeyword.includes("frontend")) {
      action = "Architected and deployed responsive user interface components utilizing modern JavaScript and component hierarchies, elevating visual design consistency.";
      metrics = "Refactored client-side code rendering and image rendering pipelines, reducing initial page load times by 40% and increasing core vitals score.";
      leadership = "Led a modular design-system initiative across frontend developers, standardizing UI assets and cutting feature development cycles by 15%.";
    } else if (roleKeyword.includes("backend")) {
      action = "Engineered and optimized microservice API gateways utilizing robust backend middleware layers, ensuring secure and scalable request routing.";
      metrics = "Restructured database schemas and query indexing strategies, reducing transaction load times by 48% and handling 10,000+ concurrent requests.";
      leadership = "Authored comprehensive technical specifications and API documentation, smoothing backend integration for 3 cross-functional team partners.";
    } else if (roleKeyword.includes("data")) {
      action = "Constructed automated data ETL pipelines processing structured and unstructured datasets, establishing robust inputs for analytical platforms.";
      metrics = "Built and fine-tuned predictive machine learning models, achieving a 94% accuracy score and speeding up automated forecasting execution by 22%.";
      leadership = "Communicated key data-driven product insights and modeling bottlenecks directly to engineering leadership to align database architectures.";
    }

    setBulletOutput({ action, metrics, leadership });
  };

  /* ---------------- SALARY ESTIMATOR & MARKET INSIGHTS (Rupees / LPA) ---------------- */
  const salaryData = useMemo(() => {
    const roleSalaryMap = {
      "Frontend Developer": { base: 8.5, range: [6.0, 14.0] },
      "Backend Developer": { base: 9.2, range: [7.0, 16.0] },
      "Data Analyst": { base: 7.8, range: [5.0, 12.0] },
      "Intern": { base: 3.5, range: [2.5, 5.0] },
      "Junior Developer": { base: 5.5, range: [4.0, 8.0] },
      "Software Engineer": { base: 9.5, range: [7.0, 16.0] },
      "Senior Engineer": { base: 18.0, range: [14.0, 28.0] },
      "Data Scientist": { base: 12.0, range: [8.5, 20.0] },
      "ML Engineer": { base: 13.0, range: [9.0, 22.0] },
      "Full Stack Developer": { base: 10.5, range: [8.0, 18.0] },
      "System Architect": { base: 22.0, range: [16.0, 35.0] },
    };

    const roleName = bestRole.role;
    const info = roleSalaryMap[roleName] || { base: 9.0, range: [7.0, 15.0] };
    const multiplier = 1 + Math.min(experience * 0.08, 0.9);
    const estimatedMedian = (info.base * multiplier).toFixed(1);
    
    const minSalary = info.range[0].toFixed(1);
    const maxSalary = info.range[1].toFixed(1);
    const finalMedian = Math.max(info.range[0], Math.min(parseFloat(estimatedMedian), info.range[1])).toFixed(1);
    
    const rangeSpan = info.range[1] - info.range[0];
    const progressPercent = Math.min(Math.max(((parseFloat(finalMedian) - info.range[0]) / rangeSpan) * 100, 10), 95);
    
    let marketLevel = "Entry Level";
    if (experience >= 7) marketLevel = "Principal/Senior";
    else if (experience >= 3) marketLevel = "Mid Level Specialist";

    return {
      min: minSalary,
      max: maxSalary,
      median: finalMedian,
      percent: progressPercent,
      level: marketLevel,
      demand: experience > 5 ? "Extreme 🔥 (9.6/10)" : "Strong 🚀 (8.8/10)",
      locations: ["Bangalore", "Pune", "Hyderabad", "Mumbai", "Remote"].slice(0, 3 + (experience % 2)),
      hotSkills: roleName.includes("Backend") || roleName.includes("Architect")
        ? ["Docker", "Kubernetes", "AWS IAM", "Redis"]
        : roleName.includes("Data") || roleName.includes("ML")
        ? ["PyTorch", "Snowflake", "dbt", "Airflow"]
        : ["TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]
    };
  }, [bestRole, experience]);

  /* ---------------- SKILL GAP LEARNING HUB ---------------- */
  const skillLearningResources = useMemo(() => {
    const missing = bestRole.missing || [];
    
    const resourceDB = {
      docker: [
        { name: "Docker Official Docs", url: "https://docs.docker.com/get-started/" },
        { name: "Docker Mastery (Udemy)", url: "https://www.udemy.com/course/docker-mastery/" }
      ],
      aws: [
        { name: "AWS Fundamentals Course", url: "https://aws.amazon.com/training/fundamentals/" },
        { name: "AWS Solutions Architect (Udemy)", url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/" }
      ],
      typescript: [
        { name: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
        { name: "TypeScript Deep Dive", url: "https://basarat.gitbook.io/typescript/" }
      ],
      react: [
        { name: "React Dev Tutorial", url: "https://react.dev/" },
        { name: "React & Redux Course", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/" }
      ],
      python: [
        { name: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/" },
        { name: "Real Python Guides", url: "https://realpython.com/" }
      ],
      fastapi: [
        { name: "FastAPI Complete Tutorial", url: "https://fastapi.tiangolo.com/tutorial/" }
      ],
      sql: [
        { name: "Mode SQL Learning Guide", url: "https://mode.com/sql-tutorial/" },
        { name: "SQL for Data Science (Coursera)", url: "https://www.coursera.org/learn/sql-for-data-science" }
      ],
      kubernetes: [
        { name: "Kubernetes Basics", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" }
      ]
    };

    return missing.map(s => {
      const lower = s.toLowerCase();
      return {
        skill: s,
        links: resourceDB[lower] || [
          { name: `Learn ${s} (Official Guide)`, url: `https://www.google.com/search?q=${encodeURIComponent(s + " official documentation tutorial")}` },
          { name: `Find courses on Coursera`, url: `https://www.coursera.org/courses?query=${encodeURIComponent(s)}` }
        ]
      };
    });
  }, [bestRole]);

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

  // ----------------- GATED FLOW FOR ANONYMOUS USERS -----------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F9F6FC] to-[#F5EFFF] p-6 md:p-12 relative">
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
              onClick={() => alert("Please log in or sign up to download reports.")}
              className="flex items-center gap-2 px-6 py-3.5 bg-gray-200 text-gray-400 font-bold text-xs shadow-none cursor-not-allowed"
              disabled
            >
              <Download className="h-4 w-4" /> Download PDF Report (Locked)
            </button>
          </div>

          {/* Gated score output */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-8 border border-white/60 shadow-md text-center flex flex-col items-center justify-center col-span-3 md:col-span-1 min-h-[220px]">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">ATS Score</p>
              <h2 className="text-6xl font-extrabold text-emerald-600 mb-2">{atsScore}%</h2>
              <span className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 rounded-full">
                {atsScore >= 70 ? "Good Fit 🚀" : "Needs Improvement 📚"}
              </span>
            </div>

            <div className="glass-card p-8 border border-white/60 shadow-sm flex flex-col justify-center col-span-3 md:col-span-2">
              <h3 className="text-xl font-bold text-[#2D1A47] mb-3 flex items-center gap-2">
                <Brain className="h-6 w-6 text-[#7C3AED]" /> Initial AI Scan Completed!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                We've parsed your resume using our advanced NLP and spaCy Named Entity Recognition (NER) pipeline. We found <strong className="text-[#7C3AED]">{totalSkills} skills</strong>, educational credentials, and calculated your ATS score.
              </p>
              <p className="text-xs text-gray-400 font-semibold">
                Uploaded Email: {data.email || "Not detected"}
              </p>
            </div>
          </div>

          {/* Locked Dashboard Mock Interface */}
          <div className="relative">
            {/* Blurred Mock Content */}
            <div className="grid md:grid-cols-2 gap-8 pointer-events-none select-none filter blur-[5px] opacity-25">
              <div className="glass-panel p-6 border h-[300px]">
                <h2 className="text-xl font-bold mb-4">Skill Distribution</h2>
              </div>
              <div className="glass-panel p-6 border h-[300px]">
                <h2 className="text-xl font-bold mb-4">ATS Benchmark</h2>
              </div>
              <div className="glass-panel p-6 border h-[200px] md:col-span-2">
                <h2 className="text-xl font-bold mb-4">Recommended Career Path</h2>
              </div>
            </div>

            {/* Lock Gating Card Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="glass-panel max-w-lg w-full p-8 md:p-10 border border-white/80 shadow-2xl text-center bg-white/75 backdrop-blur-md">
                <div className="h-16 w-16 bg-purple-100 text-[#7C3AED] flex items-center justify-center rounded-full mx-auto mb-6 border border-purple-200">
                  <Brain className="h-8 w-8 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-[#2D1A47] mb-3">
                  Unlock Your Detailed Report
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-8">
                  Sign up or log in to access ML-based job matching fit, missing skill gaps, personalized career roadmaps, AI interview preparation questions, and LinkedIn optimization templates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/signup"
                    className="px-8 py-3.5 bg-gradient-purple text-white font-bold text-xs shadow-md hover:shadow-lg transition duration-300"
                  >
                    Create Free Account
                  </a>
                  <a
                    href="/login"
                    className="px-8 py-3.5 bg-white border border-purple-200 text-[#7C3AED] hover:bg-purple-50/50 font-bold text-xs transition duration-300"
                  >
                    Log In
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ----------------- FULL AUTHENTICATED VIEW -----------------
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
              <div className="text-base text-gray-700 font-medium leading-relaxed">
                {Array.isArray(data.education) && data.education.length > 0
                  ? data.education.map((edu, idx) => <p key={idx}>{edu}</p>)
                  : "Education credentials not explicitly detected."}
              </div>
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

        {/* ---------------- SALARY ESTIMATOR & MARKET INSIGHTS (Rupees / LPA) ---------------- */}
        <div className="glass-panel p-8 border border-white/80 shadow-md mb-10">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="h-10 w-10 bg-purple-100 text-[#7C3AED] flex items-center justify-center rounded-xl shadow-sm">
              <DollarSign className="h-5.5 w-5.5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2D1A47]">Salary Estimator & Market Insights</h2>
              <p className="text-xs text-gray-500 font-medium">Real-time market valuation and regional hiring demand for your profile.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Salary Range Progress bar */}
            <div className="md:col-span-2 bg-white/40 border border-purple-100/50 p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Estimated Annual Salary</span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-extrabold text-[#7C3AED]">₹ {salaryData.median} LPA</span>
                  <span className="text-sm text-gray-500 font-bold">/ year (Median)</span>
                </div>
                
                {/* Progress bar */}
                <div className="relative pt-1 mt-6">
                  <div className="flex mb-2 items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span>Min: ₹ {salaryData.min} LPA</span>
                    <span className="text-[#7C3AED] font-bold">Level: {salaryData.level}</span>
                    <span>Max: ₹ {salaryData.max} LPA</span>
                  </div>
                  <div className="overflow-hidden h-3.5 text-xs flex rounded-full bg-purple-100/50 border border-purple-200/30">
                    <div
                      style={{ width: `${salaryData.percent}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-purple transition-all duration-1000"
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-2.5 font-semibold">
                    <span>Entry Position</span>
                    <span>Mid-Level Specialist</span>
                    <span>Senior/Lead Architect</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights panel */}
            <div className="bg-white/40 border border-purple-100/50 p-6 flex flex-col justify-between gap-5">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Market Demand Rating</span>
                <div className="text-lg font-bold text-[#2D1A47] mb-4 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 rounded-md">
                    {salaryData.demand}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Top Hiring Hubs</span>
                <div className="flex flex-wrap gap-2 mb-4">
                  {salaryData.locations.map((loc, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs text-gray-600 font-semibold bg-purple-50/50 border border-purple-100 px-2.5 py-1 rounded-md">
                      <MapPin className="h-3 w-3 text-purple-400" />
                      {loc}
                    </span>
                  ))}
                </div>

                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Hot Skills to Add</span>
                <div className="flex flex-wrap gap-1.5">
                  {salaryData.hotSkills.map((sk, i) => (
                    <span key={i} className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                      +{sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- INTERACTIVE CHECKLIST & INTERVIEW QUESTIONS ---------------- */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          
          {/* Resume Checklist */}
          <div className="glass-panel p-6 border border-white/80 shadow-md">
            <h2 className="text-xl font-bold mb-2 text-[#2D1A47] flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-[#7C3AED]" /> Resume Optimization Checklist
            </h2>
            <p className="text-xs text-gray-500 font-medium mb-6">
              Check off tasks as you solve them to view your projected ATS improvement in real-time.
            </p>

            <div className="space-y-3 mb-6">
              {improvements.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => toggleChecklist(idx)}
                  className={`p-3.5 border flex items-start gap-3 cursor-pointer select-none transition-all ${
                    checkedItems[idx] 
                      ? "bg-emerald-50/40 border-emerald-200 text-gray-500" 
                      : "bg-white/40 border-purple-100 hover:border-purple-200 text-gray-700 font-medium"
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={!!checkedItems[idx]}
                    readOnly
                    className="mt-0.5 accent-emerald-500 h-4 w-4"
                  />
                  <span className={`text-xs leading-relaxed ${checkedItems[idx] ? "line-through" : ""}`}>{item}</span>
                </div>
              ))}
            </div>

            {/* Score progress details */}
            <div className="bg-purple-50/60 border border-purple-100/50 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Projected ATS Score</p>
                <div className="text-xs text-[#7C3AED] mt-1 font-semibold">
                  +{numChecked * 4}% points projected increase
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#7C3AED]">
                {projectedScore}%
              </div>
            </div>
          </div>

          {/* AI Mock Interview Questions */}
          <div className="glass-panel p-6 border border-white/80 shadow-md">
            <h2 className="text-xl font-bold mb-2 text-[#2D1A47] flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#7C3AED]" /> AI Mock Interview Questions
            </h2>
            <p className="text-xs text-gray-500 font-medium mb-6">
              Core interview questions tailored specifically to the technologies found on your resume.
            </p>

            <div className="space-y-4">
              {interviewQuestions.map((q, idx) => (
                <div key={idx} className="bg-white/40 border border-purple-100/40 p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] bg-purple-100 text-[#7C3AED] px-2 py-0.5 font-bold">
                      {q.skill}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">Question {idx + 1}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                    "{q.question}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- BULLET POINT OPTIMIZER & LEARNING HUB ---------------- */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* AI Bullet Point Enhancer */}
          <div className="glass-panel p-6 border border-white/80 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 text-[#2D1A47] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#7C3AED]" /> AI Bullet Point Enhancer
              </h2>
              <p className="text-xs text-gray-500 font-medium mb-6">
                Paste a sentence or bullet point from your resume to enhance it with metrics and strong action verbs.
              </p>

              <div className="flex gap-2 mb-5">
                <input
                  type="text"
                  value={bulletInput}
                  onChange={(e) => setBulletInput(e.target.value)}
                  placeholder="e.g. Wrote code for backend APIs using Node.js"
                  className="w-full glass-input px-4 py-2.5 text-xs focus:ring-4 focus:ring-purple-100"
                />
                <button
                  onClick={handleEnhanceBullet}
                  className="px-5 bg-gradient-purple text-white font-bold text-xs shadow-sm hover:shadow-md transition duration-300 flex-shrink-0"
                >
                  Enhance
                </button>
              </div>

              {bulletOutput ? (
                <div className="space-y-4">
                  {/* Action-Oriented */}
                  <div className="bg-white/40 border border-purple-100/50 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] bg-purple-100 text-[#7C3AED] px-2 py-0.5 font-bold uppercase tracking-wide">
                        Action-Oriented
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(bulletOutput.action);
                          setCopiedBulletType("action");
                          setTimeout(() => setCopiedBulletType(""), 2000);
                        }}
                        className="text-gray-400 hover:text-purple-600 transition flex items-center gap-1 text-[10px] font-bold"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {copiedBulletType === "action" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                      "{bulletOutput.action}"
                    </p>
                  </div>

                  {/* Metrics-Driven */}
                  <div className="bg-white/40 border border-purple-100/50 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 font-bold uppercase tracking-wide">
                        Metrics-Driven
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(bulletOutput.metrics);
                          setCopiedBulletType("metrics");
                          setTimeout(() => setCopiedBulletType(""), 2000);
                        }}
                        className="text-gray-400 hover:text-purple-600 transition flex items-center gap-1 text-[10px] font-bold"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {copiedBulletType === "metrics" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                      "{bulletOutput.metrics}"
                    </p>
                  </div>

                  {/* Leadership */}
                  <div className="bg-white/40 border border-purple-100/50 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 font-bold uppercase tracking-wide">
                        Ownership & Scope
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(bulletOutput.leadership);
                          setCopiedBulletType("leadership");
                          setTimeout(() => setCopiedBulletType(""), 2000);
                        }}
                        className="text-gray-400 hover:text-purple-600 transition flex items-center gap-1 text-[10px] font-bold"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {copiedBulletType === "leadership" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                      "{bulletOutput.leadership}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-purple-100 rounded-none p-8 text-center text-gray-400 text-xs font-medium bg-purple-50/10">
                  Enter your bullet point above and click "Enhance" to see AI suggestions.
                </div>
              )}
            </div>
          </div>

          {/* Skill Gap Learning Hub */}
          <div className="glass-panel p-6 border border-white/80 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 text-[#2D1A47] flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#7C3AED]" /> Skill Gap Learning Hub
              </h2>
              <p className="text-xs text-gray-500 font-medium mb-6">
                Curated documentation and coursework recommendations to bridge critical skill gaps identified on your resume.
              </p>

              {skillLearningResources.length > 0 ? (
                <div className="space-y-4">
                  {skillLearningResources.map((res, index) => (
                    <div key={index} className="bg-white/40 border border-purple-100/50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <span className="text-xs font-bold text-[#2D1A47] block mb-1">
                          {res.skill}
                        </span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          Recommended Resources
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {res.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 bg-purple-100 hover:bg-[#7C3AED] hover:text-white text-[#7C3AED] text-[10px] font-bold transition duration-300 shadow-sm"
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-emerald-200 rounded-none p-8 text-center text-emerald-700 text-xs font-bold bg-emerald-50/20">
                  <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2.5" />
                  Awesome! You match all the required skills for your best matching role.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---------------- LINKEDIN PROFILE OPTIMIZER ---------------- */}
        <div className="glass-panel p-6 border border-white/80 shadow-md mb-10">
          <h2 className="text-xl font-bold mb-2 text-[#2D1A47] flex items-center gap-2">
            <LinkedinIcon className="h-5 w-5 text-[#0077B5]" /> LinkedIn Profile Optimizer
          </h2>
          <p className="text-xs text-gray-500 font-medium mb-6">
            Use these custom-generated text templates to optimize your LinkedIn reach and capture recruiter searches.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Headline */}
            <div className="bg-white/40 border border-purple-100/50 p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Recommended Headline</span>
                <p className="text-xs text-gray-700 font-bold leading-relaxed">
                  {linkedinHeadline}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(linkedinHeadline, "headline")}
                className="mt-4 py-2 border border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5]/5 transition duration-300 text-xs font-bold flex items-center justify-center gap-1.5 self-start animate-pulse-glow"
              >
                <Copy className="h-3.5 w-3.5" />
                {copiedText === "headline" ? "Copied!" : "Copy Headline"}
              </button>
            </div>

            {/* About Section */}
            <div className="bg-white/40 border border-purple-100/50 p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Recommended About Summary</span>
                <p className="text-xs text-gray-600 font-medium leading-relaxed italic">
                  "{linkedinAbout}"
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(linkedinAbout, "about")}
                className="mt-4 py-2 border border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5]/5 transition duration-300 text-xs font-bold flex items-center justify-center gap-1.5 self-start animate-pulse-glow"
              >
                <Copy className="h-3.5 w-3.5" />
                {copiedText === "about" ? "Copied!" : "Copy Summary"}
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- JOB ROLE MATCHING ---------------- */}
        <div className="glass-card p-8 border border-white/60 shadow-md mb-10">
          <h2 className="text-xl font-bold text-[#2D1A47] mb-6 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#7C3AED]" /> Job Role Analysis & Skill Checks
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {normalizedRoles.map((job, index) => (
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
                <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider mb-2">Required Skills in JD</h3>
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