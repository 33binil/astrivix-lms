import React, { useRef } from "react";
import { motion } from "framer-motion";

const LearningGrid = () => {
  const scrollRef = useRef(null);

  const testimonials = [
    { quote: "The internship program was amazing! I learned so much and gained real-world experience.", name: "Sarah Johnson", role: "Web Development Intern" },
    { quote: "The workshops were hands-on and practical. I built my first app in just 2 weeks!", name: "Mike Chen", role: "Mobile App Developer" },
    { quote: "Great mentors and supportive environment. I landed my dream job after the training!", name: "Emily Davis", role: "Data Science Trainee" },
    { quote: "The project-based learning approach helped me build a strong portfolio.", name: "Alex Thompson", role: "UI/UX Designer" },
  ];

  return (
    <div className="w-full py-12 sm:py-16 lg:py-20 bg-slate-100 dark:bg-[#0a1120] transition-colors duration-500">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-['Afacad'] text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white m-0 mb-4 transition-colors duration-500">
            What our Students <span className="text-blue-600 dark:text-blue-400 ml-2">Say's</span>
          </h2>
          <p className="font-['Happy_Monkey'] text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed transition-colors duration-500">
            Hear from our students about their hands-on learning experiences, skill development, and career growth through our internships, workshops, and training programs.
          </p>
        </motion.div>

        <div ref={scrollRef} className="lg:grid lg:grid-cols-4 gap-[60px] flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide scroll-smooth">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative flex-shrink-0 w-[85vw] lg:w-auto snap-start mr-6 lg:mr-0 last:mr-0"
            >
              <svg width="1000" height="1000" viewBox="0 0 335 356" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <g filter="url(#filter0_d_336_36)">
                  <g filter="url(#filter1_d_336_36)">
                    <path d="M26 86C26 52.8629 52.8629 26 86 26H301V262C301 295.137 274.137 322 241 322H26V86Z" fill="white" stroke="black" strokeWidth="2" className="dark:fill-slate-800 dark:stroke-slate-600"/>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_d_336_36" x="0" y="0" width="335" height="356" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="4" dy="4"/>
                    <feGaussianBlur stdDeviation="15"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_336_36"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_336_36" result="shape"/>
                  </filter>
                  <filter id="filter1_d_336_36" x="22" y="26" width="283" height="306" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="6"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_336_36"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_336_36" result="shape"/>
                  </filter>
                </defs>
              </svg>
              <div className="absolute inset-4 flex flex-col justify-center items-center text-center p-4">
                <p className="font-['Happy_Monkey'] text-xs sm:text-sm text-slate-800 dark:text-slate-200 mb-2 max-w-[90%] leading-tight transition-colors duration-500">
                  "{testimonial.quote}"
                </p>
                <h4 className="font-['Afacad'] text-sm font-bold text-slate-800 dark:text-white transition-colors duration-500">{testimonial.name}</h4>
                <p className="font-['Happy_Monkey'] text-xs text-slate-600 dark:text-slate-400 transition-colors duration-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Reviews Text Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full py-8 bg-slate-100 dark:bg-[#0a1120] transition-colors duration-500"
        >
            <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-20">
                <div className="text-center flex items-center justify-center gap-2">
                    <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <p className="font-['afacad'] text-xl sm:text-xl lg:text-xl text-slate-700 dark:text-slate-300 transition-colors duration-500">
                        "Reviews from our learners on Google"
                    </p>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default LearningGrid;