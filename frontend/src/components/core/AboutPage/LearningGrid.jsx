import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialCard = ({ quote, name, role }) => {
  return (
    <div className="flex flex-col items-center text-center px-6 py-8 h-full">
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="font-['Happy_Monkey'] text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed transition-colors duration-500 flex-1 flex items-center">
        <span>"{quote}"</span>
      </p>
      <h4 className="font-['Afacad'] text-base font-bold text-slate-800 dark:text-white mt-3 transition-colors duration-500">{name}</h4>
      <p className="font-['Happy_Monkey'] text-xs text-slate-600 dark:text-slate-400 transition-colors duration-500">{role}</p>
    </div>
  );
};

const LearningGrid = () => {
  const testimonials = [
    {
      quote: "One of the best institutions i have ever seen. Never thought that our project would come this much better and also, Ali sir helped us a lot in completing our project. Many a times we called sir to ask doubts but in his busy shedule he was helping us a lot. Thank you sir. And also in this institution cost will also be reasonable So if any one are giving less reviews don't believe in that. This is the best institution to go ahead and complete your project thanks Sir",
      name: "Pavan Babu",
      role: "Google 5 Star Review"
    },
    {
      quote: "We had joined this institute for our final year project and it was a great experience. We learned a lot. Than we have dan the project. The developer was experienced and helped us in each and every doubt we had. Thank for you good experience to me. The teacher are kind and nice",
      name: "Gowtham Suir S",
      role: "Google 5 Star Review"
    },
    {
      quote: "The project assistance from Nano Robotics Company in the field of IoT was exceptional, providing cutting-edge solutions and comprehensive support. Their expertise significantly enhanced our capabilities and streamlined our development process.",
      name: "Deeksha Reddymr",
      role: "Google 5 Star Review"
    },
    {
      quote: "I got to know about the institute through seniors of our Clg. The project building experience was top notch. The assistance provided by the staff was extremely good. The cost factor of the whole model was fairly negotiable. The amount of time spent in training and development of the project is worth the time. The internship program provided here is absolutely great. I would like to conclude by saying that, it's the best institute for advanced projects and internship in the field of ECE. Thank you",
      name: "Syed Abrar",
      role: "Google 5 Star Review"
    },
    {
      quote: "It is the best place for training and internships. The Stuff are very helpful and smart. All your doubts whether they are big doubts or small they will be cleared. I suggest all those who are looking for knowledge and want to practice and understand what is being taught in colleges to come to this place because this place is a hidden treasure",
      name: "Osamah Omar",
      role: "Google 5 Star Review"
    },
    {
      quote: "It was very good experience to work here. Since we approached this institute lately we missed some training sessions based on our project. However they managed to teach us completely within short span of time. So overall it was worth of giving our project to this Institute. The cost here is also reasonable.",
      name: "Anirudh Kashyap",
      role: "Google 5 Star Review"
    },
    {
      quote: "I learnt and enjoyed a lot in this comfortable environment... the style and knowledge of teachers and presentor was outstanding. We learnt various things IoT.",
      name: "Unnati Jha",
      role: "Google 5 Star Review"
    },
    {
      quote: "The internship session was good, we had learnt so many things and they taught us from the basic and also helped us in our project, this was more beneficial for students. Thank you sir & ma'am",
      name: "Aiswarya Sendil",
      role: "Google 5 Star Review"
    },
    {
      quote: "Amazing faculty and support, provided clear explanation for the process and methodology, had a very good experience learning",
      name: "Adithi Savanna",
      role: "Google 5 Star Review"
    },
    {
      quote: "Found this institute while roaming in that area, went and spoke to them thats it decided to do our BE project there. And it came out really good thanks to Ali sir our mentor who helped us finish our project within time and is very calm and friendly. Great place to learn about embedded systems and programming... thanks a lot sir",
      name: "Venkatesh reddy",
      role: "Google 5 Star Review"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const totalSlides = testimonials.length;

  const goNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = () => {
    setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(goNext, 5000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, goNext]);

  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  return (
    <div className="w-full py-12 sm:py-16 lg:py-20 bg-slate-100 dark:bg-[#0a1120] transition-colors duration-500">
      <div className="max-w-[800px] mx-auto px-6 sm:px-10 lg:px-20">
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

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <TestimonialCard
                  quote={testimonials[currentIndex].quote}
                  name={testimonials[currentIndex].name}
                  role={testimonials[currentIndex].role}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "bg-blue-600 dark:bg-blue-400 w-6"
                    : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

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
