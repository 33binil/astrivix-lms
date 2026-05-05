import React from "react";
import { motion } from "framer-motion";

const StatsComponenet = () => {
  const stats = [
    { value: "5000+", label: "Active Students", icon: "/education.png" },
    { value: "1500+", label: "Online Video Courses", icon: "/online-learning.png" },
    { value: "10+", label: "Expert Tutors", icon: "/teacher.png" },
    { value: "10+", label: "Years of Experience", icon: "/expertise.png" },
  ];

  return (
    <div className="w-full bg-black py-12 sm:py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/about2.jpg')"}}></div>
      <div className="absolute inset-0 bg-[#0D325E] opacity-75"></div>
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center relative"
            >
              <svg width="102" height="106" viewBox="0 0 102 106" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 sm:w-24 lg:w-28 h-auto mb-4 absolute top-0 left-1/2 transform -translate-x-1/2">
                <path d="M73.9254 1.90079C86.7527 -3.20261 100.676 6.27326 100.634 20.0784L100.435 85.87C100.388 101.502 82.8873 110.727 69.9639 101.932L9.0311 60.4619C-3.89195 51.6663 -1.73067 32.0017 12.7943 26.2228L73.9254 1.90079Z" stroke="white"/>
              </svg>
              <svg width="102" height="106" viewBox="0 0 102 106" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 sm:w-24 lg:w-28 h-auto mb-4 relative z-10 right-2 bottom-1">
                <path d="M73.7406 1.43649C86.8969 -3.79789 101.177 5.92085 101.134 20.0801L100.935 85.8716C100.887 101.905 82.9373 111.366 69.6825 102.345L8.75016 60.8754C-4.50461 51.8544 -2.28808 31.6853 12.6095 25.7582L73.7406 1.43649Z" fill="white"/>
                <foreignObject x="25" y="25" width="52" height="56" className="flex items-center justify-center">
                  <img src={stat.icon} alt={stat.label} className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain" />
                </foreignObject>
              </svg>
              <motion.h3 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="font-['Afacad'] text-2xl sm:text-3xl lg:text-3xl font-bold text-white m-0 mb-2"
              >
                {stat.value}
              </motion.h3>
              <p className="font-['afacad'] text-sm sm:text-base lg:text-lg text-white m-0">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsComponenet;