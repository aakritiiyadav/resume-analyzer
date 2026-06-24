import { motion } from "framer-motion";
import UploadBox from "../components/UploadBox";
import { UploadCloud, CheckCircle, BarChart3, Briefcase, FileText } from "lucide-react";

const Upload = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#F9F6FC] to-[#F5EFFF] px-6 md:px-14 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Heading */}
      <div className="w-full text-center mb-12">
        <p className="uppercase tracking-[4px] text-[#7C3AED] text-xs font-bold bg-purple-100/50 backdrop-blur-sm px-3 py-1.5 rounded-full inline-block mb-3">
          Resume Intelligence Lab
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D1A47]">
          Optimize Your Resume
        </h1>

        <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto font-medium">
          Get real-time ATS optimization feedback, skills gap warnings, and tailored job recommendations in seconds.
        </p>
      </div>

      {/* Steps Above Upload */}
      <motion.div 
        className="flex flex-wrap justify-center gap-6 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="glass-card px-8 py-6 w-64 text-center border border-white/60 shadow-sm"
          variants={itemVariants}
        >
          <div className="h-10 w-10 bg-purple-50 text-[#7C3AED] flex items-center justify-center rounded-full mx-auto mb-3 font-bold border border-purple-100">
            1
          </div>
          <h3 className="text-lg font-bold text-[#2D1A47] mb-2">Upload</h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Select or drag and drop your PDF or DOCX file.
          </p>
        </motion.div>

        <motion.div 
          className="glass-card px-8 py-6 w-64 text-center border border-white/60 shadow-sm"
          variants={itemVariants}
        >
          <div className="h-10 w-10 bg-purple-50 text-[#7C3AED] flex items-center justify-center rounded-full mx-auto mb-3 font-bold border border-purple-100">
            2
          </div>
          <h3 className="text-lg font-bold text-[#2D1A47] mb-2">AI Analysis</h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Gemini scans keywords, formatting, and metrics.
          </p>
        </motion.div>

        <motion.div 
          className="glass-card px-8 py-6 w-64 text-center border border-white/60 shadow-sm"
          variants={itemVariants}
        >
          <div className="h-10 w-10 bg-purple-50 text-[#7C3AED] flex items-center justify-center rounded-full mx-auto mb-3 font-bold border border-purple-100">
            3
          </div>
          <h3 className="text-lg font-bold text-[#2D1A47] mb-2">Insights</h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Verify gaps, view scores, and matching jobs.
          </p>
        </motion.div>
      </motion.div>

      {/* Center Upload Box */}
      <motion.div 
        className="flex justify-center mb-16"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="w-full max-w-3xl glass-panel border border-white/80 shadow-2xl p-10 md:p-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2D1A47] text-center mb-2">
            Scan Your Resume
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8 font-medium">
            Supports PDF and DOCX formats (Up to 10MB)
          </p>

          <div className="flex justify-center">
            <UploadBox />
          </div>
        </div>
      </motion.div>

      {/* Bottom Benefits */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="glass-card p-6 border border-white/60 shadow-sm"
          variants={itemVariants}
        >
          <div className="h-10 w-10 bg-purple-50 text-[#7C3AED] flex items-center justify-center rounded-full mb-4 border border-purple-100">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-sm text-[#2D1A47] mb-2">ATS Score</h4>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Ensure compatibility with enterprise ATS keyword filters.
          </p>
        </motion.div>

        <motion.div 
          className="glass-card p-6 border border-white/60 shadow-sm"
          variants={itemVariants}
        >
          <div className="h-10 w-10 bg-pink-50 text-pink-600 flex items-center justify-center rounded-full mb-4 border border-pink-100">
            <UploadCloud className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-sm text-[#2D1A47] mb-2">Skill Gaps</h4>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Instantly highlight missing core skills and qualifications.
          </p>
        </motion.div>

        <motion.div 
          className="glass-card p-6 border border-white/60 shadow-sm"
          variants={itemVariants}
        >
          <div className="h-10 w-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-full mb-4 border border-emerald-100">
            <Briefcase className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-sm text-[#2D1A47] mb-2">Job Matches</h4>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Unlock relevant roles fitting your specific expertise.
          </p>
        </motion.div>

        <motion.div 
          className="glass-card p-6 border border-white/60 shadow-sm"
          variants={itemVariants}
        >
          <div className="h-10 w-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full mb-4 border border-blue-100">
            <FileText className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-sm text-[#2D1A47] mb-2">Report History</h4>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Track and compare your resume improvements over time.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Upload;