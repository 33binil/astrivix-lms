import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { FiMonitor, FiBookOpen, FiUsers, FiSearch, FiStar, FiFilter, FiArrowRight } from "react-icons/fi"
import { GiReturnArrow } from 'react-icons/gi'

import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import Course_Card from '../components/core/Catalog/Course_Card'
import Loading from './../components/common/Loading';

import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import { fetchCourseCategories, getAllCourses } from './../services/operations/courseDetailsAPI';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function Catalog() {
    const { catalogName } = useParams()
    const navigate = useNavigate()
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState("popular");
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [allCoursesData, setAllCoursesData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        ; (async () => {
            try {
                const res = await fetchCourseCategories();
                setCategories(res || [])
                
                if (catalogName === "all") {
                    setShowAllCourses(true)
                    setCategoryId("")
                    return
                }
                
                const category_id = res.filter(
                    (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
                )[0]?._id
                if (category_id) setCategoryId(category_id)
            } catch (error) {
                console.log("Could not fetch Categories.", error)
            }
        })()
    }, [catalogName])

    useEffect(() => {
        const fetchAllCourses = async () => {
            setLoading(true)
            try {
                const res = await getAllCourses()
                setAllCoursesData(res || [])
            } catch (error) {
                console.log("Could not fetch all courses.", error)
            }
            setLoading(false)
        }
        fetchAllCourses()
    }, [])


    useEffect(() => {
        if (categoryId) {
            ; (async () => {
                setLoading(true)
                try {
                    const res = await getCatalogPageData(categoryId)
                    setCatalogPageData(res)
                } catch (error) {
                    console.log(error)
                }
                setLoading(false)
            })()
        }
    }, [categoryId])

    const getSortedCourses = () => {
        const courses = showAllCourses 
            ? allCoursesData 
            : (catalogPageData?.selectedCategory?.courses || [])
        
        let filtered = courses.filter(course => 
            !searchTerm || 
            course?.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course?.courseDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course?.instructor?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
        )

        if (sortBy === "price-low") {
            return filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
        } else if (sortBy === "price-high") {
            return filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
        } else if (sortBy === "rating") {
            return filtered.sort((a, b) => (b.ratingAndReviews?.length || 0) - (a.ratingAndReviews?.length || 0))
        }
        return filtered
    }

    const handleShowAllCourses = () => {
        setShowAllCourses(true)
        setSearchTerm("")
    }

    const sortedCourses = getSortedCourses()

    const GlowBg = () => (
      <>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none"></div>
      </>
    );


    return (
        <div className="bg-[#030712] min-h-screen text-white overflow-x-hidden">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[55vh] flex items-center overflow-hidden pt-24 pb-16">
                <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0a1628] to-[#030712]"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)', backgroundSize: '50px 50px' }}></div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
                    <motion.div
                        initial="hidden" animate="visible" variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center pt-12"
                    >
                        {/* Back Button */}
                        <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8 justify-start max-w-4xl mx-auto cursor-pointer group" onClick={() => navigate(-1)}>
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                                <GiReturnArrow size={20} />
                            </div>
                            <span className="text-sm font-bold text-slate-400 group-hover:text-blue-400 transition-colors">Back</span>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                            <FiMonitor size={14} /> Nano Robotics Embed Technologies
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                                {showAllCourses ? "All Courses" : catalogPageData?.selectedCategory?.name || "Courses"}
                            </span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                            {showAllCourses 
                                ? "Explore our complete collection of courses across all domains. Find the perfect course to kickstart your learning journey." 
                                : catalogPageData?.selectedCategory?.description}
                        </motion.p>

                        {/* Stats */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                    <FiBookOpen size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-bold text-white leading-none">
                                        {showAllCourses ? allCoursesData.length : (catalogPageData?.selectedCategory?.courses?.length || 0)}
                                    </p>
                                    <p className="text-slate-400 text-sm mt-1">Courses</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                    <FiUsers size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-bold text-white leading-none">
                                        {showAllCourses 
                                            ? allCoursesData.reduce((acc, c) => acc + (c.studentsEnrolled?.length || 0), 0)
                                            : catalogPageData?.selectedCategory?.courses?.reduce((acc, c) => acc + (c.studentsEnrolled?.length || 0), 0)
                                        }
                                    </p>
                                    <p className="text-slate-400 text-sm mt-1">Students</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Search Bar */}
                        <motion.div variants={fadeInUp} className="max-w-2xl mx-auto relative">
                            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="text"
                                placeholder="Search courses by name, description, or instructor..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ===== FILTERS ===== */}
            <section className="relative py-6 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <FiFilter className="text-slate-500" size={16} />
                            <button
                                onClick={handleShowAllCourses}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    showAllCourses 
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30" 
                                        : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                All Courses
                            </button>
                            {categories.slice(0, 5).map((category) => (
                                <button
                                    key={category._id}
                                    onClick={() => {
                                        setShowAllCourses(false)
                                        setCategoryId(category._id)
                                        setSearchTerm("")
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                        !showAllCourses && categoryId === category._id
                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30" 
                                            : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm text-slate-400 flex items-center gap-2">
                                Sort:
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white/5 border border-white/10 text-slate-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                            >
                                <option value="popular" className="bg-[#030712]">Most Popular</option>
                                <option value="rating" className="bg-[#030712]">Highest Rated</option>
                                <option value="price-low" className="bg-[#030712]">Price: Low to High</option>
                                <option value="price-high" className="bg-[#030712]">Price: High to Low</option>
                            </select>
                            <span className="text-slate-500 text-sm ml-2">
                                <span className="text-blue-400 font-bold">{sortedCourses.length}</span> courses
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== COURSES GRID ===== */}
            <section className="py-16 relative">
                <GlowBg />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loading />
                        </div>
                    ) : sortedCourses.length > 0 ? (
                        <motion.div
                            initial="hidden" animate="visible" variants={staggerContainer}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {sortedCourses.map((course, index) => (
                                <motion.div key={course._id} variants={fadeInUp}>
                                    <Course_Card course={course} viewMode="grid" />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiBookOpen className="w-8 h-8 text-slate-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">No Courses Found</h3>
                            <p className="text-slate-400 mb-6">
                                {searchTerm 
                                    ? "Try adjusting your search criteria" 
                                    : "No courses available in this category yet. Check back soon!"}
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-all duration-300"
                                >
                                    Clear Search
                                </button>
                            )}
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Catalog
