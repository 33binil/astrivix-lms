import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { FaChalkboardTeacher, FaGraduationCap, FaArrowRight, FaCode, FaLaptopCode, FaCubes, FaUserSecret } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import animationData from "../animations/1760540193944.json";
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import HomeImage from '../assets/Images/Home.png';
import Course_Slider from '../components/core/Catalog/Course_Slider';
import { getAllCourses } from '../services/operations/courseDetailsAPI';

// Import marquee images
import bg1 from '../assets/Images/gallery1.avif';
import bg2 from '../assets/Images/gallery2.avif';
import bg3 from '../assets/Images/gallery3.avif';
import bg4 from '../assets/Images/gallery4.avif';
import bg5 from '../assets/Images/gallery5.avif';
import bg6 from '../assets/Images/gallery6.avif';
import bg7 from '../assets/Images/gallery7.avif';
import bg8 from '../assets/Images/gallery8.avif';

const marqueeImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Helper component for bullet point
const FaCheckCircle = ({ className }) => (
  <svg className={`w-4 h-4 ${className}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
)

const Home = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCourses = await getAllCourses();
        setCourses(allCourses);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleStartCourse = () => {
    navigate('/catalog/all');
  };

  return (
    <div className="relative w-full bg-slate-50 dark:bg-[#000814] overflow-hidden font-inter transition-colors duration-500">
      {/* Navbar Overlay */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors duration-500">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-screen pt-14 md:pt-20 flex items-center overflow-hidden bg-gradient-to-br from-[#f4f8ff] via-[#ffffff] to-[#e6f0fa] dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
        <div className="absolute inset-0 z-0 opacity-25 dark:opacity-15 dark:invert dark:hue-rotate-180 pointer-events-none transition-all duration-500">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: '150%', height: '150%', objectFit: 'cover', marginTop: '-10%' }}
              className="sm:w-full sm:h-full"
            />
          )}
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#2A86F7]/10 dark:bg-[#2A86F7]/20 blur-[100px] z-0 transition-colors duration-500"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#2A86F7]/5 dark:bg-[#2A86F7]/10 blur-[120px] z-0 transition-colors duration-500"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full h-full flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-16 py-4 lg:py-0">
            <motion.div
              initial="hidden" animate="visible" variants={staggerContainer}
              className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="text-slate-700 dark:text-white font-medium text-base sm:text-lg md:text-xl md:mb-4 mb-2 transition-colors duration-500">
                Start with your Favourite
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-medium text-slate-900 dark:text-white leading-[1.2] md:mb-6 mb-3 transition-colors duration-500 tracking-tight">
                Now Learning from <br className="hidden lg:block" />
                anywhere, and build your <br className="hidden lg:block" />
                <span className="text-[#2A86F7] relative inline-block mt-2 font-semibold z-10">
                  bright career
                  <svg className="absolute w-[110%] h-[12px] md:h-[18px] -bottom-3 -left-[5%] text-[#2A86F7] opacity-80 z-[-1]" viewBox="0 0 200 16" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13C45.3333 4.33333 135.6 -9.2 198 12.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M15 14.5C51 7.66667 131 -2.79998 185 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-sm md:text-lg text-slate-600 dark:text-white md:mb-10 mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light transition-colors duration-500">
                Empower yourself with Quality Education <br className="hidden sm:block" /> and Lifelong Learning
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleStartCourse}
                  className="w-full sm:w-auto px-8 md:px-10 py-3 rounded-full bg-[#2A86F7] text-white font-medium text-sm md:text-base shadow-lg shadow-[#2A86F7]/30 transform transition-all duration-300 hover:scale-105 hover:bg-[#1f73db] hover:shadow-[#2A86F7]/50 flex items-center justify-center gap-2"
                >
                  Start a Course
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="lg:w-1/2 relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto flex flex-col sm:block mt-8 sm:mt-2 lg:mt-0 z-0"
            >
              <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] dark:shadow-[0_20px_50px_rgba(0,_0,_0,_0.5)] border-[4px] md:border-[8px] border-white dark:border-slate-800 z-0 transition-colors duration-500 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0 mix-blend-multiply pointer-events-none"></div>
                <img src={HomeImage} alt="Learning Dashboard" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
              </div>

              {/* Elegant floating stats */}
              <div className="flex flex-row justify-center sm:block gap-2 sm:gap-3 mt-4 sm:mt-0 w-full z-30">
                <motion.div
                  animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative sm:absolute sm:-left-16 sm:top-32 bg-white dark:bg-slate-800 backdrop-blur-md px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-sm sm:shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-black/50 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 border border-slate-100 sm:border-white/60 dark:border-slate-700 transition-colors duration-500 w-auto sm:w-max sm:scale-100 origin-left flex-1 sm:flex-none max-w-[160px] sm:max-w-none"
                >
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#2DB0FC] flex items-center justify-center text-white shrink-0">
                    <FaChalkboardTeacher size={14} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="pr-1 text-left">
                    <h4 className="font-bold text-sm sm:text-xl text-slate-900 dark:text-white leading-tight">5000+</h4>
                    <p className="text-[8px] sm:text-[10px] font-medium text-slate-500 dark:text-slate-200 leading-tight">Active Students</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="relative sm:absolute sm:-right-6 lg:-right-12 sm:top-10 bg-white dark:bg-slate-800 backdrop-blur-md px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-sm sm:shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-black/50 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 border border-slate-100 sm:border-white/60 dark:border-slate-700 transition-colors duration-500 w-auto sm:w-max sm:scale-100 origin-right flex-1 sm:flex-none max-w-[160px] sm:max-w-none"
                >
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#FA5B5B] flex items-center justify-center text-white shadow-inner shrink-0">
                    <FaGraduationCap size={14} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="pr-1 text-left">
                    <h4 className="font-bold text-sm sm:text-xl text-slate-900 dark:text-white leading-tight">1500+</h4>
                    <p className="text-[8px] sm:text-[10px] font-medium text-slate-500 dark:text-slate-200 leading-tight">Online Video Courses</p>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* Code Animation Section */}
      <div className="py-24 bg-slate-100 dark:bg-[#00040a] border-t border-slate-200 dark:border-slate-900/50 relative z-20 overflow-hidden transition-colors duration-500">
        {/* Glow Effects */}
        <div className="absolute top-0 right-[-10%] w-[50%] h-[100%] rounded-full bg-blue-300/40 dark:bg-blue-600/10 blur-[120px] z-0 pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="lg:w-1/2 order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Learn Modern Skills <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-cyan-400 dark:to-blue-500">From the Experts</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed font-light">
                Whether you want to build web applications, train AI models, or design beautiful interfaces, our curriculum adapts to the latest industry standards.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Practical Experience", desc: "Build real projects that you can showcase on your portfolio." },
                  { title: "Expert Mentorship", desc: "Get feedback and guidance from seasoned industry professionals." },
                  { title: "Lifetime Access", desc: "Learn at your own pace and revisit course material anytime." }
                ].map((item, idx) => (
                  <motion.div variants={fadeInUp} key={idx} className="flex gap-4 items-start bg-white dark:bg-[#0a1120] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors duration-300">
                    <div className="mt-1 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-500/30">
                      <FaArrowRight size={14} />
                    </div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-semibold text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:w-1/2 order-1 lg:order-2 w-full"
            >
              <div className="rounded-2xl bg-[#0d1117] dark:bg-[#0d1117] border border-slate-700 shadow-2xl shadow-blue-900/30 dark:shadow-[0_0_40px_rgba(8,112,184,0.15)] overflow-hidden relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-[#161b22] px-4 py-3 flex gap-2 border-b border-slate-700 items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="text-[11px] text-slate-400 ml-4 font-mono font-medium tracking-wider">App.jsx — React Workspace</span>
                </div>
                <div className="p-6 sm:p-8 font-mono text-sm leading-8 text-indigo-300 relative min-h-[320px]">
                  <div className="flex">
                    <div className="text-slate-600 select-none pr-6 text-right hidden sm:block border-r border-slate-800 mr-6 font-medium">
                      {Array.from({ length: 10 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                    </div>
                    <TypeAnimation
                      sequence={[
                        `import { NextLevel } from 'study-notion';\n\nconst Career = () => {\n  return (\n    <NextLevel>\n      <h1>Master the Future</h1>\n      <p>Code, Create, Innovate</p>\n    </NextLevel>\n  );\n};\n\nexport default Career;`,
                        3000,
                        ""
                      ]}
                      repeat={Infinity}
                      style={{ whiteSpace: "pre-wrap", color: '#38bdf8' }}
                      cursor={true}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Domain Categories */}
      <div className="py-24 bg-white dark:bg-[#000814] relative transition-colors duration-500">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-3 block transition-colors duration-500">Paths to Success</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 transition-colors duration-500">Explore Our Domains</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 transition-colors duration-500">Master the technologies that power today's world. Dive deep into specialized domains with our expert-led programs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FaLaptopCode size={28} />, title: "Web & App Dev", color: "from-blue-500 to-indigo-600", lightBg: "bg-blue-50", ring: "hover:ring-blue-200 dark:hover:ring-blue-900/50" },
              { icon: <FaCode size={28} />, title: "AI & ML", color: "from-emerald-400 to-teal-600", lightBg: "bg-emerald-50", ring: "hover:ring-emerald-200 dark:hover:ring-emerald-900/50" },
              { icon: <FaCubes size={28} />, title: "IoT & Robotics", color: "from-amber-400 to-orange-500", lightBg: "bg-amber-50", ring: "hover:ring-amber-200 dark:hover:ring-amber-900/50" },
              { icon: <FaUserSecret size={28} />, title: "Cybersecurity", color: "from-rose-400 to-red-500", lightBg: "bg-rose-50", ring: "hover:ring-rose-200 dark:hover:ring-rose-900/50" },
              { icon: <img src="/src1.png" className="w-7 h-7 object-contain mix-blend-screen opacity-100 invert" alt="UIUX" />, title: "UI/UX Design", color: "from-purple-500 to-fuchsia-600", lightBg: "bg-purple-50", ring: "hover:ring-purple-200 dark:hover:ring-purple-900/50" },
              { icon: <img src="/src2.png" className="w-7 h-7 object-contain mix-blend-screen opacity-100 invert" alt="Cloud" />, title: "Cloud Computing", color: "from-sky-400 to-blue-600", lightBg: "bg-sky-50", ring: "hover:ring-sky-200 dark:hover:ring-sky-900/50" },
            ].map((domain, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}
                key={index} className={`group cursor-pointer rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 overflow-hidden relative bg-white dark:bg-[#0a1120] hover:ring-4 ring-opacity-50 ${domain.ring}`}
              >
                <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-10 dark:opacity-[0.15] bg-gradient-to-br ${domain.color} group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-br shadow-md ${domain.color} transform group-hover:scale-110 transition-transform duration-300`}>
                  {domain.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 dark:group-hover:from-blue-400 dark:group-hover:to-indigo-400 transition-colors">{domain.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium transition-colors duration-500">Comprehensive pathways designed for absolute beginners to advanced practitioners.</p>
                <div className="flex items-center text-sm font-bold text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-wide">
                  View Programs <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/catalog/all')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Click to Show Courses <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Bootcamp Section */}
      <section className="py-24 bg-slate-50 dark:bg-[#060c18] relative border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-500">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase text-sm mb-3 block transition-colors duration-500">Real World Experience</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 transition-colors duration-500">Bootcamp & Internships</h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-lg transition-colors duration-500">Elevate your resume by building production-ready projects under expert supervision.</p>
            </div>
            <button onClick={() => navigate('/internship')} className="shrink-0 px-6 py-3 rounded-full bg-white dark:bg-[#161D29] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:border-indigo-600 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2">
              Explore All <FaArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: "/prg1.jpeg", title: "Robotics Engineering", tag: "Hardware", desc: "Build autonomous physical robots." },
              { img: "/prg2.jpeg", title: "AI Integration", tag: "Software", desc: "Deploy ML models to production." },
              { img: "/prg3.jpeg", title: "Modern UI/UX", tag: "Design", desc: "Design interfaces users fall in love with." },
              { img: "/prg4.jpeg", title: "IoT Architecture", tag: "Hardware + Software", desc: "Connect the digital & physical worlds." }
            ].map((prog, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: idx * 0.1 }} viewport={{ once: true }}
                key={idx} className="group rounded-[1.5rem] overflow-hidden bg-white dark:bg-[#0a1120] border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-indigo-900/10 dark:hover:shadow-indigo-900/20 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/20 dark:bg-slate-900/40 group-hover:bg-transparent dark:group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                  <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm border border-white/50 dark:border-slate-700 transition-colors duration-500">{prog.tag}</div>
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 transition-colors duration-500">{prog.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mb-6 flex-1 transition-colors duration-500">{prog.desc}</p>
                  <button className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-bold group-hover:bg-indigo-600 dark:group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 border border-transparent dark:group-hover:border-indigo-500">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Advisors */}
      <section className="py-24 bg-slate-50 dark:bg-[#00040a] relative overflow-hidden transition-colors duration-500">
        {/* Abstract shapes */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-400/30 dark:bg-blue-600/10 rounded-full blur-[120px] transition-colors duration-500"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-400/30 dark:bg-purple-600/10 rounded-full blur-[120px] transition-colors duration-500"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm mb-3 block transition-colors duration-500">Expert Guidance</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Learn from the Best</h2>
            <p className="text-lg text-slate-600 dark:text-slate-500 font-light transition-colors duration-500">Our advisory board consists of industry veterans and academic researchers dedicated to crafting the perfect curriculum.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-6xl mx-auto">
            {/* Advisor 1 */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} viewport={{ once: true }}
              className="flex flex-col sm:flex-row bg-white dark:bg-[#08101e] backdrop-blur-sm rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl transition-colors duration-500"
            >
              <div className="sm:w-2/5 p-2 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600/80 dark:to-purple-700/80">
                <img src="/boy.png" alt="Dr Kareem Unisa" className="w-full h-full object-cover rounded-3xl" />
              </div>
              <div className="sm:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-1">Akshay Kamal</h3>
                <p className="text-indigo-600 dark:text-indigo-300 font-bold text-sm tracking-wide uppercase mb-6 transition-colors duration-500">Founder & Research Director</p>
                <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800 mb-6 rounded-full transition-colors duration-500"></div>
                <ul className="space-y-3 text-slate-700 dark:text-slate-400 text-sm font-medium transition-colors duration-500">
                  <li className="flex items-start gap-3"><FaCheckCircle className="text-indigo-500 dark:text-indigo-500 mt-0.5 shrink-0" /> PhD Researcher specializing in AI</li>
                  <li className="flex items-start gap-3"><FaCheckCircle className="text-indigo-500 dark:text-indigo-500 mt-0.5 shrink-0" /> Architect of modern curriculum</li>
                  <li className="flex items-start gap-3"><FaCheckCircle className="text-indigo-500 dark:text-indigo-500 mt-0.5 shrink-0" /> 15+ years of academic excellence</li>
                </ul>
              </div>
            </motion.div>

            {/* Advisor 2 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} viewport={{ once: true }}
              className="flex flex-col sm:flex-row bg-white dark:bg-[#08101e] backdrop-blur-sm rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl transition-colors duration-500"
            >
              <div className="sm:w-2/5 p-2 bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-600/80 dark:to-cyan-700/80">
                <img src="/boy.png" alt="Dr Baba Fakruddin Ali" className="w-full h-full object-cover rounded-3xl" />
              </div>
              <div className="sm:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-1">Romy Roy</h3>
                <p className="text-blue-600 dark:text-blue-300 font-bold text-sm tracking-wide uppercase mb-6 transition-colors duration-500">Co-founder & AI Architect</p>
                <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800 mb-6 rounded-full transition-colors duration-500"></div>
                <ul className="space-y-3 text-slate-700 dark:text-slate-400 text-sm font-medium transition-colors duration-500">
                  <li className="flex items-start gap-3"><FaCheckCircle className="text-blue-500 dark:text-blue-500 mt-0.5 shrink-0" /> Pioneer in AI & Machine Learning</li>
                  <li className="flex items-start gap-3"><FaCheckCircle className="text-blue-500 dark:text-blue-500 mt-0.5 shrink-0" /> Built AI products used globally</li>
                  <li className="flex items-start gap-3"><FaCheckCircle className="text-blue-500 dark:text-blue-500 mt-0.5 shrink-0" /> 20+ years in tech leadership</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white dark:bg-[#000814] transition-colors duration-500">
        <div className="container mx-auto px-6 lg:px-12 text-center mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider uppercase text-sm mb-3 block transition-colors duration-500">Community</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 transition-colors duration-500">Life at Astrivix</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-lg max-w-2xl mx-auto transition-colors duration-500">Glimpses of our vibrant community, hands-on workshops, and memorable events that shape the future of our students.</p>
        </div>

        {/* Infinite Scrolling Marquee */}
        <div className="relative w-full overflow-hidden flex bg-slate-50 dark:bg-[#060c18] py-12 border-y border-slate-200 dark:border-slate-800/80 shadow-inner transition-colors duration-500">
          <motion.div
            animate={{ x: [0, -4202] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap pl-8"
          >
            {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((imgSrc, idx) => (
              <div key={idx} className="w-[350px] h-[250px] rounded-3xl overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-none shrink-0 border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0a1120] p-3 hover:-translate-y-2 transition-all duration-300">
                <img src={imgSrc} alt={`Gallery Image ${idx + 1}`} className="w-full h-full object-cover rounded-2xl" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
