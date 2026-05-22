import React from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiUsers, FiArrowRight, FiStar, FiMonitor, FiCpu, FiServer, FiAward, FiBook, FiBriefcase, FiCode, FiMail, FiPhone, FiMapPin, FiCheck, FiGlobe, FiLayers, FiTool, FiLinkedin, FiYoutube } from 'react-icons/fi'
import { GiReturnArrow, GiArtificialIntelligence, GiMicrochip, GiCircuitry, GiRobotGolem, GiBrain, GiSatelliteCommunication, GiSolarSystem } from 'react-icons/gi'

// Import gallery images
import bg1 from '../assets/Images/gallery1.avif';
import bg2 from '../assets/Images/gallery2.avif';
import bg3 from '../assets/Images/gallery3.avif';
import bg4 from '../assets/Images/gallery4.avif';
import bg5 from '../assets/Images/gallery5.avif';
import bg6 from '../assets/Images/gallery6.avif';
import bg7 from '../assets/Images/gallery7.avif';
import bg8 from '../assets/Images/gallery8.avif';

const marqueeImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];
import { SiPython, SiWebassembly, SiGooglecloud, SiOpencv, SiReasonstudios } from 'react-icons/si'
import { BsCpuFill, BsHddNetwork } from 'react-icons/bs'
import { HiAcademicCap, HiLightBulb, HiCube } from 'react-icons/hi'

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const SectionHeader = ({ badge, title, desc }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }}
    variants={staggerContainer}
    className="text-center max-w-3xl mx-auto mb-16"
  >
    <motion.span variants={fadeInUp} className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-3 block">{badge}</motion.span>
    <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6">{title}</motion.h2>
    {desc && <motion.p variants={fadeInUp} className="text-lg text-slate-400">{desc}</motion.p>}
  </motion.div>
);

const GlowBg = () => (
  <>
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none"></div>
  </>
);


const features = [
  { icon: <FiUsers size={24} />, title: "1:1 Industry Mentorship" },
  { icon: <FiMonitor size={24} />, title: "Practical Learning" },
  { icon: <FiLayers size={24} />, title: "Real-Time Projects" },
  { icon: <FiBriefcase size={24} />, title: "Internships" },
  { icon: <FiAward size={24} />, title: "Qualified Instructors" },
  { icon: <FiTool size={24} />, title: "On-demand Teaching Assistants" },
  { icon: <FiCalendar size={24} />, title: "Flexible Learning" },
  { icon: <GiBrain size={24} />, title: "AI/ML Training" },
];

const projects = [
  { title: "Precision Smart Farming Bot", tag: "IoT" },
  { title: "Smart Healthcare Monitoring Wristband", tag: "IoT" },
  { title: "AI-Powered Fire Detection System", tag: "AI" },
  { title: "Voice-Controlled Home Automation Hub", tag: "IoT" },
  { title: "AI Robotic Arm", tag: "Robotics" },
  { title: "Warehouse Inventory Drone", tag: "Robotics" },
  { title: "AI Dog Bot", tag: "Robotics" },
  { title: "Self-Driving Lawn Mower Bot", tag: "Robotics" },
  { title: "Face Recognition Attendance System", tag: "AI" },
  { title: "Heart Disease Predictor", tag: "AI" },
  { title: "Stock Price Trend Prediction", tag: "AI" },
  { title: "Handwritten Digit Recognition App", tag: "AI" },
  { title: "AI Resume Builder", tag: "AI" },
  { title: "AI Character Writer", tag: "AI" },
  { title: "Interactive Textbook", tag: "Web" },
  { title: "AI Mental Health Chat Companion", tag: "AI" },
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

const Workshops = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#030712] min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0a1628] to-[#030712]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)', backgroundSize: '50px 50px' }}></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8">
              <FiMonitor size={14} /> Nano Robotics Embed Technologies
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Workshops & Practical Learning
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Hands-on training in <span className="text-blue-400 font-semibold">AI, Robotics, IoT,</span> and <span className="text-blue-400 font-semibold">Embedded Systems</span> — gain practical skills through project-based learning and industry mentorship at NRET.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate("/workshop-booking")} className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-base shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2">
                Explore Workshops <FiArrowRight />
              </button>
              <button className="px-8 py-3.5 rounded-full bg-white/5 border border-white/20 text-white font-bold text-base hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                Join NRET <FiArrowRight />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. ABOUT WORKSHOPS ===== */}
      <section className="py-24 relative">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <SectionHeader badge="About" title="Why NRET Workshops?" desc="Practical, application-based learning designed to bridge the gap between academia and industry." />
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              { title: "Hands-on Learning", desc: "Work directly with hardware and software in every session, building real projects from day one." },
              { title: "Practical Application", desc: "Apply theoretical concepts to real-world problems through guided lab sessions." },
              { title: "Industry Mentorship", desc: "Learn from experienced professionals who guide you through the learning process." },
              { title: "Skill Development", desc: "Develop technical and professional skills that are directly relevant to the industry." },
              { title: "Workshops & Internships", desc: "Transition seamlessly from workshops to internship opportunities at NRET." },
              { title: "Real-World Projects", desc: "Build production-ready projects that demonstrate your capabilities to employers." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.08] hover:border-blue-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <FiCheck size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 4. WORKSHOP FEATURES ===== */}
      <section className="py-24 relative">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <SectionHeader badge="Features" title="Workshop Features" desc="Everything you need to succeed in your learning journey." />
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/[0.08] hover:border-blue-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-400 bg-blue-500/10 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="text-white text-sm font-semibold">{f.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 7. LEARNING ECOSYSTEM ===== */}
      <section className="py-24 relative bg-white/[0.02]">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <SectionHeader badge="Ecosystem" title="Learning Ecosystem" desc="A complete ecosystem designed to support your growth from beginner to professional." />
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {ecosystemItems.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/[0.08] hover:border-blue-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-400 bg-blue-500/10 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-white text-sm font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section className="py-24 relative bg-white/[0.02]">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center mb-16">
          <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-3 block">Community</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Life at NRET</h2>
          <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">Glimpses of our vibrant community, hands-on workshops, and memorable events that shape the future of our students.</p>
        </div>

        <div className="relative w-full overflow-hidden flex py-12 border-y border-white/5">
          <motion.div
            animate={{ x: [0, -4202] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap pl-8"
          >
            {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((imgSrc, idx) => (
              <div key={idx} className="w-[350px] h-[250px] rounded-3xl overflow-hidden relative shrink-0 border border-white/10 bg-[#0a1120] p-3 hover:-translate-y-2 transition-all duration-300">
                <img src={imgSrc} alt={`Gallery Image ${idx + 1}`} className="w-full h-full object-cover rounded-2xl" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 8. FINAL CTA ===== */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-600/5"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              Join NRET to gain hands-on experience <br />and industry-relevant skills!
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Take the first step towards building real-world projects and advancing your career in AI, Robotics, IoT, and Embedded Systems.
            </p>
            <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-base shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2">
              Join NRET Now <FiArrowRight />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Workshops
