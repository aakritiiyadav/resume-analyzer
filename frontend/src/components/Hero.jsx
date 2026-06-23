import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen bg-[#F9F6FC] px-6 md:px-14 flex items-center">
      <div className="grid md:grid-cols-2 gap-10 w-full">

        {/* Left */}
        <div>
          <p className="uppercase tracking-[6px] text-[#9B7BC4] text-sm mb-4">
            AI Powered Resume Analysis
          </p>

          <h1 className="text-6xl font-bold text-[#2D1E3E] leading-tight">
            Build Smarter <br />
            Get Hired Faster
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Improve ATS scores, discover missing skills,
            and find jobs tailored to your profile.
          </p>

          <div className="flex gap-4 mt-8">
            <div className="bg-white p-5 border border-[#DCCBF0] shadow-md">
              ATS Optimization
            </div>

            <div className="bg-white p-5 border border-[#DCCBF0] shadow-md">
              Smart Matching
            </div>
          </div>
        </div>

        {/* Right */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white p-8 shadow-md border border-[#DCCBF0]">
            <h2 className="text-3xl font-bold text-[#8E6CB3]">95%</h2>
            <p>ATS Accuracy</p>
          </div>

          <div className="bg-white p-8 shadow-md border border-[#DCCBF0]">
            <h2 className="text-3xl font-bold text-[#8E6CB3]">10K+</h2>
            <p>Resumes Analyzed</p>
          </div>

          <div className="bg-white p-8 shadow-md border border-[#DCCBF0]">
            <h2 className="text-3xl font-bold text-[#8E6CB3]">500+</h2>
            <p>Job Matches</p>
          </div>

          <div className="bg-white p-8 shadow-md border border-[#DCCBF0]">
            <h2 className="text-3xl font-bold text-[#8E6CB3]">24/7</h2>
            <p>AI Support</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;