import { motion } from "framer-motion";
import UploadBox from "../components/UploadBox";

const Upload = () => {
  return (
    <motion.div
      className="min-h-screen bg-[#F9F6FC] px-6 md:px-14 py-12"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Heading */}
      <div className="w-full text-center mb-12">
        <p className="uppercase tracking-[5px] text-[#9B7BC4] text-sm mb-3">
          Resume Intelligence Lab
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-[#2D1E3E]">
          Upload & Optimize Your Resume
        </h1>

        <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
          Get ATS insights, job matches, and skill-gap analysis
          in seconds.
        </p>
      </div>

      {/* Steps Above Upload */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">

        <div className="bg-white border border-[#E7DAF4] shadow-md px-8 py-5 w-60 text-center">
          <h3 className="text-xl font-bold text-[#8E6CB3] mb-2">Step 1</h3>
          <p className="text-sm text-gray-700">
            Upload your resume file
          </p>
        </div>

        <div className="bg-white border border-[#E7DAF4] shadow-md px-8 py-5 w-60 text-center">
          <h3 className="text-xl font-bold text-[#8E6CB3] mb-2">Step 2</h3>
          <p className="text-sm text-gray-700">
            AI scans your profile
          </p>
        </div>

        <div className="bg-white border border-[#E7DAF4] shadow-md px-8 py-5 w-60 text-center">
          <h3 className="text-xl font-bold text-[#8E6CB3] mb-2">Step 3</h3>
          <p className="text-sm text-gray-700">
            Get instant insights
          </p>
        </div>

      </div>

      {/* Center Upload Box */}
      <div className="flex justify-center mb-14">
        <div className="w-full max-w-3xl bg-white border border-[#DCCBF0] shadow-xl p-10">

          <h2 className="text-3xl font-bold text-[#2D1E3E] text-center mb-4">
            Upload Resume
          </h2>

          <p className="text-center text-gray-600 mb-8">
            Upload your PDF or DOCX file to start analysis.
          </p>

          <div className="flex justify-center">
            <UploadBox />
          </div>

        </div>
      </div>

      {/* Bottom Benefits */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-[#EFE7F8] border border-[#DCCBF0] p-5">
          <h4 className="font-bold mb-2">ATS Score</h4>
          <p className="text-sm text-gray-600">
            Improve recruiter compatibility.
          </p>
        </div>

        <div className="bg-[#EFE7F8] border border-[#DCCBF0] p-5">
          <h4 className="font-bold mb-2">Skill Gap</h4>
          <p className="text-sm text-gray-600">
            Discover missing skills.
          </p>
        </div>

        <div className="bg-[#EFE7F8] border border-[#DCCBF0] p-5">
          <h4 className="font-bold mb-2">Job Match</h4>
          <p className="text-sm text-gray-600">
            Find relevant opportunities.
          </p>
        </div>

        <div className="bg-[#EFE7F8] border border-[#DCCBF0] p-5">
          <h4 className="font-bold mb-2">History</h4>
          <p className="text-sm text-gray-600">
            Track previous analyses.
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default Upload;