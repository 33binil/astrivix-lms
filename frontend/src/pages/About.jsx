import React from "react"

import Footer from "../components/common/Footer"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import StatsComponenet from "../components/core/AboutPage/Stats"

import { motion } from 'framer-motion';
import { fadeIn } from "../components/common/motionFrameVarients"




const About = () => {
    return (
        <div className="bg-slate-50 dark:bg-[#000814] transition-colors duration-500">
            <div className="flex flex-col relative lg:flex-row px-6 sm:px-10 lg:px-20 py-8 sm:py-12 lg:py-16 gap-0 sm:gap-12 lg:gap-12 w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
                {/* Left side with circles */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 lg:pr-12 self-center"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8 h-auto sm:h-[600px] lg:h-[880px]">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-[150px] sm:w-[290px] lg:w-[290px] h-[250px] sm:h-[440px] lg:h-[440px] bg-slate-800 dark:bg-slate-700 rounded-[125px_125px_125px_0px] mx-auto sm:mx-0 overflow-hidden shadow-lg"
                        >
                            <img src="/abou1.png" alt="About Us" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="w-[130px] sm:w-[265px] lg:w-[265px] h-[130px] sm:h-[265px] lg:h-[265px] bg-slate-800 dark:bg-slate-700 rounded-full self-center mx-auto sm:mx-0 overflow-hidden shadow-lg"
                        >
                            <img src="/about2.png" alt="About Us 2" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="w-[130px] sm:w-[265px] lg:w-[265px] h-[80px] sm:h-[145px] lg:h-[145px] bg-[#C5DFFF] dark:bg-blue-900/50 rounded-[60px_0px_60px_60px] top-1 sm:top-44 lg:top-0 relative mx-auto sm:mx-0 flex items-center px-3 sm:px-4 shadow-lg"
                        >
                            <img src="/coaching.png" alt="Hands-on guidance" className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mr-2 sm:mr-3 object-contain" />
                            <p className="text-xs sm:text-sm font-['Afacad'] text-slate-800 dark:text-slate-200">Hands-on guidance in robotics and embedded systems.</p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="w-[150px] sm:w-[290px] lg:w-[290px] h-[130px] sm:h-[400px] lg:h-[400px] bg-slate-800 dark:bg-slate-700 rounded-[0px_125px_125px_125px] mx-auto sm:mx-0 overflow-hidden shadow-lg"
                        >
                            <img src="/about3.png" alt="About Us 3" className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right side with content */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="flex-1 lg:pl-8 top-0 sm:top-20 relative flex flex-col justify-center gap-6"
                >
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="font-['Afacad'] text-2xl sm:text-3xl m-0 text-slate-700 dark:text-slate-300 text-center sm:text-left transition-colors duration-500"
                    >
                        # About Us
                    </motion.h2>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="font-['Happy_Monkey'] text-3xl sm:text-4xl lg:text-[52px] m-0 leading-tight text-slate-800 dark:text-white text-center sm:text-left transition-colors duration-500"
                    >
                        Shaping Future Innovators in Robotics & Embedded Systems
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="font-['Happy_Monkey'] text-base sm:text-lg leading-relaxed m-0 text-slate-600 dark:text-slate-300 max-w-2xl text-center sm:text-left transition-colors duration-500"
                    >
                        We provide hands-on learning through internships, workshops, and weekend training programs, empowering students and professionals to gain real-world skills in robotics, embedded systems, and emerging technologies. Our goal is to bridge the gap between theory and practice, preparing learners for successful careers in the tech industry.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row lg:flex-row gap-8 mt-4">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="flex flex-col gap-6"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="flex flex-col sm:flex-row items-start gap-3"
                            >
                                <div className="w-[50px] sm:w-[60px] lg:w-[70px] h-[50px] sm:h-[60px] lg:h-[70px] bg-[#94CAE0] dark:bg-blue-600 rounded-full flex-shrink-0 mx-auto sm:mx-0 flex items-center justify-center">
                                    <img src="/best-practice.png" alt="Practical Learning" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain" />
                                </div>
                                <div className="flex flex-col text-center sm:text-left">
                                    <h3 className="font-['Afacad'] text-base sm:text-lg m-0 text-slate-800 dark:text-white">Practical Learning</h3>
                                    <p className="font-['Happy_Monkey'] w-full sm:w-64 text-sm leading-relaxed m-0 text-slate-600 dark:text-slate-400">Hands-on internships, workshops, and training programs to build real-world skills in robotics and embedded systems.</p>
                                </div>
                            </motion.div>

                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="flex flex-col sm:flex-row items-start gap-3"
                            >
                                <div className="w-[50px] sm:w-[60px] lg:w-[70px] h-[50px] sm:h-[60px] lg:h-[70px] bg-[#94CAE0] dark:bg-blue-600 rounded-full flex-shrink-0 mx-auto sm:mx-0 flex items-center justify-center">
                                    <img src="/skill.png" alt="Practical Learning" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain" />
                                </div>
                                <div className="flex flex-col text-center sm:text-left">
                                    <h3 className="font-['Afacad'] text-base sm:text-lg m-0 text-slate-800 dark:text-white">Skill Development</h3>
                                    <p className="font-['Happy_Monkey'] w-full sm:w-64 text-sm leading-relaxed m-0 text-slate-600 dark:text-slate-400">Gain expertise through structured courses and projects that prepare you for successful tech careers.</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                            className="w-full sm:w-[245px] lg:w-[245px] h-auto sm:h-[250px] lg:h-[250px] bg-[#BAD2DC] dark:bg-slate-700 p-6 sm:p-8 flex flex-col justify-between rounded-xl flex-shrink-0 mx-auto sm:ml-auto"
                        >
                            <p className="font-['Happy_Monkey'] text-sm sm:text-base leading-relaxed m-0 text-slate-800 dark:text-slate-200 text-center sm:text-left">Learning by doing is the key to mastering technology. Every project is a step closer to innovation.</p>
                            <p className="font-['Happy_Monkey'] text-xs sm:text-sm m-0 text-slate-700 dark:text-slate-300 self-center sm:self-end">-Akshay Kamal</p>
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