import React from "react"

import Footer from "../components/common/Footer"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import StatsComponenet from "../components/core/AboutPage/Stats"

import { motion } from 'framer-motion';
import { fadeIn } from "../components/common/motionFrameVarients"




const About = () => {
    return (
        <div className="bg-slate-50 dark:bg-[#000814] transition-colors duration-500">
            <div className="flex flex-col relative lg:flex-row px-6 sm:px-10 md:px-14 lg:px-16 xl:px-28 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 gap-0 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-12 w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
                {/* Left side with circles */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 lg:pr-3 xl:pr-6 self-center"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-2 grid-rows-2 gap-2 sm:gap-3 md:gap-4 gap-3 h-auto sm:h-[500px] md:h-[550px] lg:h-[500px] xl:h-[750px]">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-[130px] sm:w-[220px] md:w-[250px] lg:w-[200px] xl:w-[320px] h-[180px] sm:h-[330px] md:h-[360px] lg:h-[280px] xl:h-[440px] bg-slate-800 dark:bg-slate-700 rounded-[100px_100px_100px_0px] sm:rounded-[125px_125px_125px_0px] mx-auto sm:mx-0 overflow-hidden shadow-lg"
                        >
                            <img src="/abou1.avif" alt="About Us" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="w-[110px] sm:w-[200px] md:w-[220px] lg:w-[180px] xl:w-[290px] h-[110px] sm:h-[200px] md:h-[220px] lg:h-[180px] xl:h-[290px] bg-slate-800 dark:bg-slate-700 rounded-full self-center mx-auto sm:mx-0 overflow-hidden shadow-lg"
                        >
                            <img src="/about2.avif" alt="About Us 2" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="w-[110px] sm:w-[200px] md:w-[220px] lg:w-[180px] xl:w-[290px] h-[70px] sm:h-[110px] md:h-[120px] lg:h-[100px] xl:h-[150px] bg-[#C5DFFF] dark:bg-blue-900/50 rounded-[50px_0px_50px_50px] sm:rounded-[60px_0px_60px_60px] relative mx-auto sm:mx-0 flex items-center px-2 sm:px-4 shadow-lg"
                        >
                            <img src="/coaching.png" alt="Hands-on guidance" className="w-5 h-5 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-6 lg:h-6 xl:w-8 xl:h-8 flex-shrink-0 mr-2 sm:mr-3 object-contain" />
                            <p className="text-[10px] sm:text-xs md:text-sm lg:text-[10px] xl:text-sm font-['Afacad'] text-slate-800 dark:text-slate-200">Hands-on guidance in robotics and embedded systems.</p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="w-[130px] sm:w-[220px] md:w-[250px] lg:w-[200px] xl:w-[320px] h-[100px] sm:h-[300px] md:h-[320px] lg:h-[250px] xl:h-[400px] bg-slate-800 dark:bg-slate-700 rounded-[0px_100px_100px_100px] sm:rounded-[0px_125px_125px_125px] mx-auto sm:mx-0 overflow-hidden shadow-lg"
                        >
                            <img src="/about3.avif" alt="About Us 3" className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right side with content */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="flex-1 lg:pl-2 xl:pl-4 relative flex flex-col justify-center gap-4 md:gap-5 lg:gap-4 xl:gap-6"
                >
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="font-['Afacad'] text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-4xl m-0 text-slate-700 dark:text-slate-300 text-center sm:text-left transition-colors duration-500"
                    >
                        # About Us
                    </motion.h2>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="font-['Happy_Monkey'] text-2xl sm:text-3xl md:text-4xl lg:text-[28px] xl:text-[48px] m-0 leading-tight text-slate-800 dark:text-white text-center sm:text-left transition-colors duration-500"
                    >
                        Shaping Future Innovators in Robotics & Embedded Systems
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="font-['Happy_Monkey'] text-sm sm:text-base md:text-lg lg:text-sm xl:text-xl leading-relaxed m-0 text-slate-600 dark:text-slate-300 max-w-2xl text-center sm:text-left transition-colors duration-500"
                    >
                        We provide hands-on learning through internships, workshops, and weekend training programs, empowering students and professionals to gain real-world skills in robotics, embedded systems, and emerging technologies. Our goal is to bridge the gap between theory and practice, preparing learners for successful careers in the tech industry.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row lg:flex-row gap-6 md:gap-8 mt-2 md:mt-4">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="flex flex-col gap-4 md:gap-6"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="flex flex-col sm:flex-row items-start gap-2 md:gap-3"
                            >
                                <div className="w-[40px] sm:w-[50px] md:w-[60px] lg:w-[50px] xl:w-[70px] h-[40px] sm:h-[50px] md:h-[60px] lg:h-[50px] xl:h-[70px] bg-[#94CAE0] dark:bg-blue-600 rounded-full flex-shrink-0 mx-auto sm:mx-0 flex items-center justify-center">
                                    <img src="/best-practice.png" alt="Practical Learning" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5 xl:w-8 xl:h-8 object-contain" />
                                </div>
                                <div className="flex flex-col text-center sm:text-left">
                                    <h3 className="font-['Afacad'] text-sm sm:text-base md:text-lg lg:text-base xl:text-xl m-0 text-slate-800 dark:text-white">Practical Learning</h3>
                                    <p className="font-['Happy_Monkey'] w-full sm:w-56 md:w-64 lg:w-48 xl:w-72 text-xs sm:text-sm md:text-base lg:text-xs xl:text-base leading-relaxed m-0 text-slate-600 dark:text-slate-400">Hands-on internships, workshops, and training programs to build real-world skills in robotics and embedded systems.</p>
                                </div>
                            </motion.div>

                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="flex flex-col sm:flex-row items-start gap-2 md:gap-3"
                            >
                                <div className="w-[40px] sm:w-[50px] md:w-[60px] lg:w-[50px] xl:w-[70px] h-[40px] sm:h-[50px] md:h-[60px] lg:h-[50px] xl:h-[70px] bg-[#94CAE0] dark:bg-blue-600 rounded-full flex-shrink-0 mx-auto sm:mx-0 flex items-center justify-center">
                                    <img src="/skill.png" alt="Practical Learning" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5 xl:w-8 xl:h-8 object-contain" />
                                </div>
                                <div className="flex flex-col text-center sm:text-left">
                                    <h3 className="font-['Afacad'] text-sm sm:text-base md:text-lg lg:text-base xl:text-xl m-0 text-slate-800 dark:text-white">Skill Development</h3>
                                    <p className="font-['Happy_Monkey'] w-full sm:w-56 md:w-64 lg:w-48 xl:w-72 text-xs sm:text-sm md:text-base lg:text-xs xl:text-base leading-relaxed m-0 text-slate-600 dark:text-slate-400">Gain expertise through structured courses and projects that prepare you for successful tech careers.</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                            className="w-full sm:w-[220px] md:w-[250px] lg:w-[180px] xl:w-[280px] h-auto sm:h-[220px] md:h-[250px] lg:h-[180px] xl:h-[280px] bg-[#BAD2DC] dark:bg-slate-700 p-4 sm:p-6 md:p-8 lg:p-4 xl:p-8 flex flex-col justify-between rounded-xl flex-shrink-0 mx-auto sm:ml-auto"
                        >
                            <p className="font-['Happy_Monkey'] text-xs sm:text-sm md:text-base lg:text-xs xl:text-base leading-relaxed m-0 text-slate-800 dark:text-slate-200 text-center sm:text-left">Learning by doing is the key to mastering technology. Every project is a step closer to innovation.</p>
                            <p className="font-['Happy_Monkey'] text-[10px] sm:text-xs md:text-sm lg:text-[10px] xl:text-sm m-0 text-slate-700 dark:text-slate-300 self-center sm:self-end">-Akshay Kamal</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>



            <StatsComponenet />

            <LearningGrid />

            {/* footer */}
            <Footer />
        </div>
    )
}

export default About