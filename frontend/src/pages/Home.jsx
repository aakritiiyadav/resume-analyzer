import Hero from "../components/Hero";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-[#F9F6FC]">

      <Hero />

      {/* Stats Section */}
      <section className="px-6 md:px-14 py-14">
        <div className="grid md:grid-cols-4 gap-6 text-center">

          <div className="bg-white p-6 shadow-md border border-[#DCCBF0]">
            <h2 className="text-3xl font-bold text-[#8E6CB3]">10K+</h2>
            <p className="text-gray-600 mt-2">Resumes Analyzed</p>
          </div>

          <div className="bg-white p-6 shadow-md border border-[#DCCBF0]">
            <h2 className="text-3xl font-bold text-[#8E6CB3]">95%</h2>
            <p className="text-gray-600 mt-2">ATS Accuracy</p>
          </div>

          <div className="bg-white p-6 shadow-md border border-[#DCCBF0]">
            <h2 className="text-3xl font-bold text-[#8E6CB3]">500+</h2>
            <p className="text-gray-600 mt-2">Job Matches</p>
          </div>

          <div className="bg-white p-6 shadow-md border border-[#DCCBF0]">
            <h2 className="text-3xl font-bold text-[#8E6CB3]">24/7</h2>
            <p className="text-gray-600 mt-2">AI Support</p>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-14 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#2D1E3E]">
          Why Choose ResumeAI?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <motion.div
            className="bg-white border border-[#DCCBF0] p-8 shadow-md"
            whileHover={{ y: -8 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-[#4B2E67]">
              ATS Analysis
            </h3>
            <p className="text-gray-600">
              Improve your resume to pass applicant tracking systems.
            </p>
          </motion.div>

          <motion.div
            className="bg-white border border-[#DCCBF0] p-8 shadow-md"
            whileHover={{ y: -8 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-[#4B2E67]">
              Skill Detection
            </h3>
            <p className="text-gray-600">
              Detect missing skills and improve your profile.
            </p>
          </motion.div>

          <motion.div
            className="bg-white border border-[#DCCBF0] p-8 shadow-md"
            whileHover={{ y: -8 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-[#4B2E67]">
              Smart Matching
            </h3>
            <p className="text-gray-600">
              Find jobs that match your skills and experience.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Quote Section */}
      <section className="px-6 md:px-14 py-20 text-center">
        <div className="bg-[#EFE7F8] border border-[#DCCBF0] p-12 shadow-md">
          <h2 className="text-3xl font-bold text-[#4B2E67] mb-4">
            Your next opportunity starts with a better resume.
          </h2>
          <p className="text-gray-600 text-lg">
            Let AI guide your career growth.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;