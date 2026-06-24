import Hero from "../components/Hero";
import { motion } from "framer-motion";
import { Award, Search, Cpu, CheckCircle, Clock, TrendingUp, Sparkles } from "lucide-react";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Stats Section */}
      <section className="px-6 md:px-14 py-16 relative">
        <div className="absolute inset-0 bg-[#F5F0FF]/30 pointer-events-none" />
        
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="glass-card p-6 text-center border border-white/60 shadow-sm"
            variants={itemVariants}
          >
            <div className="h-12 w-12 bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 rounded-full">
              <Search className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-extrabold text-[#7C3AED]">10K+</h2>
            <p className="text-gray-500 text-sm font-semibold mt-2 uppercase tracking-wide">Resumes Scanned</p>
          </motion.div>

          <motion.div 
            className="glass-card p-6 text-center border border-white/60 shadow-sm"
            variants={itemVariants}
          >
            <div className="h-12 w-12 bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 rounded-full">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-extrabold text-emerald-600">95%</h2>
            <p className="text-gray-500 text-sm font-semibold mt-2 uppercase tracking-wide">ATS Accuracy</p>
          </motion.div>

          <motion.div 
            className="glass-card p-6 text-center border border-white/60 shadow-sm"
            variants={itemVariants}
          >
            <div className="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 rounded-full">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-extrabold text-blue-600">500+</h2>
            <p className="text-gray-500 text-sm font-semibold mt-2 uppercase tracking-wide">Job Matches</p>
          </motion.div>

          <motion.div 
            className="glass-card p-6 text-center border border-white/60 shadow-sm"
            variants={itemVariants}
          >
            <div className="h-12 w-12 bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4 rounded-full">
              <Clock className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-extrabold text-pink-600">24/7</h2>
            <p className="text-gray-500 text-sm font-semibold mt-2 uppercase tracking-wide">AI Feedback</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="px-6 md:px-14 py-20 bg-white/40 backdrop-blur-md border-y border-[#E6DDF0]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[3px] font-bold text-[#7C3AED] bg-purple-50 border border-purple-100 px-3.5 py-1.5 rounded-full">
              Core Capabilities
            </span>
            <h2 className="text-4xl font-bold text-[#2D1A47] mt-6">
              Why Choose ResumeAI?
            </h2>
            <p className="text-gray-500 mt-4 text-base font-medium">
              We analyze details that humans overlook, optimizing every word to match modern hiring standards.
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div 
              className="glass-card p-8 border border-white/60 shadow-sm flex flex-col items-start"
              variants={itemVariants}
            >
              <div className="h-12 w-12 bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-white flex items-center justify-center mb-6 shadow-md">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#2D1A47]">
                ATS Parsing
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Ensure your resume passes keyword filters and parsing checks implemented by modern enterprise applicant tracking systems.
              </p>
            </motion.div>

            <motion.div 
              className="glass-card p-8 border border-white/60 shadow-sm flex flex-col items-start"
              variants={itemVariants}
            >
              <div className="h-12 w-12 bg-gradient-to-br from-[#EC4899] to-[#FBCFE8] text-white flex items-center justify-center mb-6 shadow-md">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#2D1A47]">
                Skill Gap Detection
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Discover key missing tools, libraries, or methodologies required for your target job descriptions and get active upskilling recommendations.
              </p>
            </motion.div>

            <motion.div 
              className="glass-card p-8 border border-white/60 shadow-sm flex flex-col items-start"
              variants={itemVariants}
            >
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-emerald-300 text-white flex items-center justify-center mb-6 shadow-md">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#2D1A47]">
                Smart Matching
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Receive instant fit-ratings and matched job roles across top platforms that correspond perfectly with your experience level.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quote / CTA Section */}
      <section className="px-6 md:px-14 py-24 text-center">
        <motion.div 
          className="max-w-4xl mx-auto glass-panel border border-white/80 p-12 md:p-16 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C3AED]/10 to-transparent rounded-full blur-xl pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2D1A47] mb-6 leading-snug">
            Your next opportunity starts with <br />
            a <span className="text-gradient">smarter, optimized</span> resume.
          </h2>
          <p className="text-gray-600 text-base max-w-lg mx-auto font-medium mb-8">
            Empower your career growth. Let Gemini-powered AI help you stand out to recruiters in seconds.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} className="inline-block">
            <a 
              href="/upload" 
              className="px-8 py-4 bg-gradient-purple text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
            >
              Analyze Your Resume Now
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;