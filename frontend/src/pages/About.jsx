import React from "react"
import Footer from "../components/common/Footer"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import StatsComponenet from "../components/core/AboutPage/Stats"
import { motion } from 'framer-motion'
import { FiArrowRight, FiMonitor, FiBook, FiBriefcase, FiUsers, FiCalendar, FiLayers, FiTool, FiStar, FiCheck } from 'react-icons/fi'
import { GiArtificialIntelligence, GiMicrochip, GiCircuitry, GiRobotGolem, GiBrain, GiSatelliteCommunication } from 'react-icons/gi'
import { SiPython, SiOpencv } from 'react-icons/si'
import { BsHddNetwork } from 'react-icons/bs'
import { FiCode } from 'react-icons/fi'
import { HiAcademicCap } from 'react-icons/hi'

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const SectionHeader = ({ badge, title, desc }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }}
    variants={staggerContainer}
    className="text-center max-w-3xl mx-auto mb-16"
  >
    <motion.span variants={fadeInUp} className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-3 block">{badge}</motion.span>
    <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-6">{title}</motion.h2>
    {desc && <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400">{desc}</motion.p>}
  </motion.div>
);

const GlowBg = () => (
  <>
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none"></div>
  </>
);

const domains = [
  { icon: <GiArtificialIntelligence size={28} />, title: "AI & ML" },
  { icon: <GiSatelliteCommunication size={28} />, title: "IoT" },
  { icon: <GiMicrochip size={28} />, title: "Embedded Systems" },
  { icon: <GiRobotGolem size={28} />, title: "Robotics" },
  { icon: <SiPython size={28} />, title: "Python" },
  { icon: <BsHddNetwork size={28} />, title: "Cloud Computing" },
  { icon: <FiCode size={28} />, title: "Web Development" },
  { icon: <SiOpencv size={28} />, title: "Image Processing" },
  { icon: <HiAcademicCap size={28} />, title: "Digital Marketing" },
];

const learningExperience = [
  { icon: <FiUsers size={24} />, title: "1:1 Industry Mentorship" },
  { icon: <FiMonitor size={24} />, title: "Practical Learning" },
  { icon: <FiStar size={24} />, title: "Qualified Instructors" },
  { icon: <FiTool size={24} />, title: "On-demand Teaching Assistants" },
  { icon: <FiCalendar size={24} />, title: "Flexible Learning" },
  { icon: <FiLayers size={24} />, title: "Real-Time Projects" },
];

const ecosystemItems = [
  { icon: <FiMonitor size={28} />, title: "Practical Learning" },
  { icon: <FiBook size={28} />, title: "Skill Development" },
  { icon: <FiUsers size={28} />, title: "Expert Guidance" },
  { icon: <GiBrain size={28} />, title: "AI/ML Training" },
  { icon: <HiAcademicCap size={28} />, title: "STEM Camps" },
  { icon: <FiBriefcase size={28} />, title: "Internships" },
  { icon: <FiCalendar size={28} />, title: "Flexible Learning" },
  { icon: <FiLayers size={28} />, title: "Industry Projects" },
];

const About = () => {
  return (
    <div className="bg-slate-50 dark:bg-[#030712] min-h-screen text-slate-800 dark:text-white overflow-x-hidden transition-colors duration-500">

      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen pt-24 pb-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-[#030712] dark:via-[#0a1628] dark:to-[#030712]"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)', backgroundSize: '50px 50px' }}></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left - Images */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2"
            >
              <div className="flex gap-4 sm:gap-6 h-fit w-full max-w-lg mx-auto lg:mx-0">
                <div className="flex flex-col gap-4 w-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full aspect-[3/4] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px_40px_40px_0px] overflow-hidden shadow-lg"
                  >
                    <img src="/abou1.avif" alt="About NRET" className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="w-full aspect-[3/1] bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/20 rounded-[30px_0px_30px_30px] flex items-center px-4 gap-3 bg-white/50 dark:bg-transparent"
                  >
                    <img src="/coaching.png" alt="Hands-on guidance" className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 object-contain" />
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-['Afacad']">Hands-on guidance in robotics and embedded systems.</p>
                  </motion.div>
                </div>
                <div className="flex flex-col gap-4 w-1/2 justify-between">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full aspect-square bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full overflow-hidden shadow-lg"
                  >
                    <img src="/about2.avif" alt="About NRET 2" className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="w-full aspect-[4/3] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[0px_40px_40px_40px] overflow-hidden shadow-lg"
                  >
                    <img src="/about3.avif" alt="About NRET 3" className="w-full h-full object-cover" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-block text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-4"
              >
                Nano Robotics Embed Technologies
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              >
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                  NRET
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
              >
                Empowering students and professionals with practical, hands-on learning in AI, Robotics, IoT, and Embedded Systems through real-world projects, workshops, and industry mentorship.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-base shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2">
                  Explore Programs <FiArrowRight />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 2. ABOUT NRET ===== */}
      <section className="py-24 relative bg-slate-100 dark:bg-white/[0.02] overflow-hidden">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <SectionHeader badge="About" title="What is NRET?" desc="Nano Robotics Embed Technologies — a hub for AI-powered learning and skill-based training." />
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 lg:row-span-1 relative p-8 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-transparent overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-5">
                  <FiMonitor className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Nano Robotics Embed Technologies</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  NRET bridges the gap between academic learning and industry requirements through AI-powered education, practical skill development, and hands-on project experiences.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">AI-Powered</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">Skill-Based</span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">Hands-On</span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold">Industry-Ready</span>
                </div>
              </div>
            </motion.div>

            {[
              { icon: <GiBrain size={24} />, title: "AI-Powered Learning", desc: "Enhance learning with artificial intelligence.", color: "from-blue-500 to-indigo-600" },
              { icon: <FiBook size={24} />, title: "Skill-Based Training", desc: "Build job-ready technical skills.", color: "from-emerald-500 to-teal-600" },
              { icon: <FiMonitor size={24} />, title: "Practical Application", desc: "Learn by doing through hands-on projects.", color: "from-amber-500 to-orange-600" },
              { icon: <FiStar size={24} />, title: "Future-Ready Courses", desc: "Curriculum aligned with industry trends.", color: "from-purple-500 to-fuchsia-600" },
              { icon: <FiLayers size={24} />, title: "Real-World Projects", desc: "Build production-grade solutions.", color: "from-cyan-500 to-blue-600" },
              { icon: <FiBriefcase size={24} />, title: "Workshops & Internships", desc: "Intensive training and industry exposure.", color: "from-rose-500 to-pink-600" },
              { icon: <FiCalendar size={24} />, title: "Summer Camps", desc: "Innovation and technical curiosity programs.", color: "from-green-500 to-emerald-600" },
              { icon: <FiUsers size={24} />, title: "Industry Mentorship", desc: "Guidance from experienced professionals.", color: "from-violet-500 to-purple-600" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-xl p-6 hover:shadow-lg dark:hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-400 hover:-translate-y-1 overflow-hidden flex flex-col"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500`}></div>
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white">{item.icon}</span>
                </div>
                <h3 className="text-slate-800 dark:text-white font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed flex-1">{item.desc}</p>
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/5">
                  <span className="text-blue-600/60 dark:text-blue-400/60 text-[10px] font-semibold tracking-wider uppercase">Pillar {i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. WHAT WE OFFER ===== */}
      <section className="py-24 relative">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <SectionHeader badge="Offerings" title="What We Offer" desc="Explore our range of technology domains and training programs." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {domains.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-5 text-center hover:shadow-lg dark:hover:bg-white/[0.08] hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600 dark:text-blue-400 bg-blue-500/10 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  {d.icon}
                </div>
                <h3 className="text-slate-800 dark:text-white font-semibold text-sm">{d.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. LEARNING EXPERIENCE ===== */}
      <section className="py-24 relative bg-slate-100 dark:bg-white/[0.02]">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <SectionHeader badge="Experience" title="Learning Experience" desc="A learning environment designed for practical skill development and real-world readiness." />
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {learningExperience.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-5 text-center hover:shadow-lg dark:hover:bg-white/[0.08] hover:border-blue-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600 dark:text-blue-400 bg-blue-500/10 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-slate-800 dark:text-white text-sm font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 5. CURRICULUM ADVISORS ===== */}
      <section className="py-24 relative">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <SectionHeader badge="Advisors" title="Curriculum Advisors" desc="Our curriculum is designed and guided by experienced professionals and researchers." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-lg dark:hover:bg-white/[0.08] transition-all duration-300"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-slate-200 dark:border-white/10 flex-shrink-0">
                <img src="/boy.png" alt="Dr. Baba Fakruddin Ali" className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Dr. Baba Fakruddin Ali</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-3">Co-founder, NRET</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm"><FiCheck className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" size={14} /> Specialized in Embedded Systems, IoT, AI & ML</li>
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm"><FiCheck className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" size={14} /> Author of Introduction to ML</li>
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm"><FiCheck className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" size={14} /> Holds 3 patents in technology and innovation</li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-lg dark:hover:bg-white/[0.08] transition-all duration-300"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-slate-200 dark:border-white/10 flex-shrink-0">
                <img src="/girl.png" alt="Dr. Kareem Unisa" className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Dr. Kareem Unisa (PhD)</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-3">Founder, NRET</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm"><FiCheck className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" size={14} /> Research Development Program Director</li>
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm"><FiCheck className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" size={14} /> PhD researcher at VIT focusing on AI-driven bots</li>
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm"><FiCheck className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" size={14} /> Specialized in research and practical AI learning</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 7. FINAL CTA ===== */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-600/5"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl p-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-6 leading-tight">
              Join NRET to gain hands-on experience <br />and industry-relevant skills!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Take the next step in your career with practical training, real-world projects, and mentorship from industry experts.
            </p>
            <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-base shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2">
              Explore Programs <FiArrowRight />
            </button>
          </motion.div>
        </div>
      </section>

      

      <LearningGrid />

      <Footer />
    </div>
  )
}

export default About
