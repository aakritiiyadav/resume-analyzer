import { useEffect, useState } from "react";
import API from "../services/api";
import { FileText, Calendar, Download, Award, GraduationCap, Clock } from "lucide-react";
import { motion } from "framer-motion";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/api/history");
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = (resume) => {
    const blob = new Blob(
      [JSON.stringify(resume, null, 2)],
      { type: "application/json" }
    );
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-report-${resume.email || "report"}.json`;
    a.click();
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
    <div className="min-h-screen bg-gradient-to-b from-[#F9F6FC] to-[#F5EFFF] px-6 md:px-14 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#2D1A47] mb-2">
          Scan History
        </h1>
        <p className="text-sm text-gray-500 font-medium mb-10">
          Review and download previous resume analysis reports.
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin h-8 w-8 text-[#7C3AED]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : history.length === 0 ? (
          <div className="glass-panel p-12 text-center border border-white/60 shadow-md">
            <Clock className="h-12 w-12 text-purple-300 mx-auto mb-4 animate-float" />
            <h3 className="text-lg font-bold text-[#2D1A47] mb-1">No Scan History Found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
              You haven't scanned any resumes yet. Upload your first resume to see reports here.
            </p>
            <a href="/upload" className="px-6 py-3 bg-gradient-purple text-white font-bold text-xs shadow-sm hover:shadow-md transition">
              Scan Resume
            </a>
          </div>
        ) : (
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {history.map((resume, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 md:p-8 border border-white/60 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
                variants={itemVariants}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-purple-100/80 text-[#7C3AED] flex items-center justify-center rounded-xl shadow-sm flex-shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2D1A47] mb-1">
                      {resume.email || "Email not detected"}
                    </h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500 font-semibold mt-2">
                      <span className="flex items-center gap-1">
                        <Award className="h-3.5 w-3.5 text-emerald-500" /> ATS Score: <span className="text-emerald-600 font-bold">{resume.ats_score?.total_score || 0}%</span>
                      </span>
                      {resume.experience_years > 0 && (
                        <span className="flex items-center gap-1 border-l pl-4 border-gray-200">
                          Experience: {resume.experience_years} yrs
                        </span>
                      )}
                    </div>

                    {resume.skills?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5 max-w-2xl">
                        {resume.skills.slice(0, 8).map((skill, i) => (
                          <span key={i} className="bg-purple-100/50 border border-purple-200/20 text-[#7C3AED] px-2 py-0.5 text-xs font-semibold">
                            {skill}
                          </span>
                        ))}
                        {resume.skills.length > 8 && (
                          <span className="text-xs text-gray-400 font-bold self-center ml-1">
                            +{resume.skills.length - 8} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => downloadReport(resume)}
                  className="flex items-center justify-center gap-2 px-5 py-3 border border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition duration-300 text-xs font-bold self-start md:self-center"
                >
                  <Download className="h-4 w-4" /> Download Report
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default History;