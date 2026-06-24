import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-16">
      {/* Background Image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url('/resume_ai_hero_bg.png')` }}
      />
      {/* Radial glow overlay for aesthetic depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-14 grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block uppercase tracking-[4px] text-xs font-bold text-[#7C3AED] bg-purple-100/60 backdrop-blur-sm px-4 py-2 mb-6 border border-purple-200/50">
            🤖 AI-Powered Resume intelligence
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-[#2D1A47] leading-[1.1] mb-6">
            Optimize Your Resume.<br />
            <span className="text-gradient">Land Your Dream Job.</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg font-medium">
            Scan your resume against applicant tracking systems (ATS), identify critical skill gaps, and unlock jobs tailored precisely to your profile.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/upload"
              className="px-8 py-4 bg-gradient-purple text-white font-bold text-sm shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] transition-all duration-300 animate-pulse-glow"
            >
              ATS Optimization
            </Link>

            <Link
              to="/upload"
              className="px-8 py-4 bg-white/60 hover:bg-white/80 border border-purple-200/80 text-[#7C3AED] font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              Smart Matching
            </Link>
          </div>
        </motion.div>

        {/* Right Column - Premium ATS Score Mockup Card */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative glowing background rings */}
          <div className="absolute w-72 h-72 bg-purple-300/30 blur-3xl rounded-full -z-10 animate-float" />
          <div className="absolute w-60 h-60 bg-pink-300/20 blur-3xl rounded-full -z-10 animate-float" style={{ animationDelay: '2s' }} />

          {/* Main Glass Mockup Container */}
          <div className="glass-card w-full max-w-md p-8 relative overflow-hidden border border-white/60 shadow-xl">
            {/* Soft inner glow reflection */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-white/40 to-transparent rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#2D1A47]">ATS Scan Complete</h3>
                <p className="text-xs text-gray-500 font-medium">Model Version: Gemini 1.5 Pro</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                Ready to Apply 🚀
              </span>
            </div>

            {/* Visual Circular Rating Tracker */}
            <div className="flex justify-center items-center mb-8 relative">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle cx="72" cy="72" r="62" stroke="#E9D5FF" strokeWidth="12" fill="transparent" />
                <circle 
                  cx="72" cy="72" r="62" stroke="url(#purpleGradient)" strokeWidth="12" fill="transparent"
                  strokeDasharray={389.5} strokeDashoffset={389.5 * (1 - 0.85)} strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-extrabold text-[#2D1A47]">85%</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">ATS Score</span>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full text-xs font-bold">✓</div>
                <p className="text-sm font-medium text-gray-700">Matched 8 core keywords in Job Description</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full text-xs font-bold">✓</div>
                <p className="text-sm font-medium text-gray-700">Hired-ready layout and format detected</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full text-xs font-bold">!</div>
                <p className="text-sm font-medium text-gray-700">Missing 1 key skill requirement: <span className="font-semibold text-purple-700">TypeScript</span></p>
              </div>
            </div>

            {/* Floating tag elements for background layer overlap */}
            <motion.div 
              className="absolute -right-4 top-1/4 bg-white/90 backdrop-blur-md px-3 py-1.5 shadow-md border border-purple-100 text-xs font-bold text-purple-600 rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ⚡ TypeScript Missing
            </motion.div>
            <motion.div 
              className="absolute -left-6 bottom-1/4 bg-white/90 backdrop-blur-md px-3 py-1.5 shadow-md border border-emerald-100 text-xs font-bold text-emerald-600 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              ✓ Python Detected
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;