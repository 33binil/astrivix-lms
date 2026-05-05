import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaBookOpen, FaUsers, FaStar, FaFilter, FaSortAmountDown } from "react-icons/fa"
import { GiReturnArrow } from 'react-icons/gi'

import Footer from "../components/common/Footer"
import Course_Card from '../components/core/Catalog/Course_Card'
import Loading from './../components/common/Loading';

import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import { fetchCourseCategories, getAllCourses } from './../services/operations/courseDetailsAPI';




function Catalog() {

    const { catalogName } = useParams()
    const navigate = useNavigate()
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState("popular");
    const [viewMode, setViewMode] = useState("grid");
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [allCoursesData, setAllCoursesData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        ; (async () => {
            try {
                const res = await fetchCourseCategories();
                setCategories(res || [])
                
                // Handle "all" catalog - show all courses
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
        
        if (sortBy === "price-low") {
            return courses.sort((a, b) => (a.price || 0) - (b.price || 0))
        } else if (sortBy === "price-high") {
            return courses.sort((a, b) => (b.price || 0) - (a.price || 0))
        } else if (sortBy === "rating") {
            return courses.sort((a, b) => (b.ratingAndReviews?.length || 0) - (a.ratingAndReviews?.length || 0))
        }
        return courses
    }

    const handleShowAllCourses = () => {
        setShowAllCourses(true)
    }

    const handleShowCategory = () => {
        setShowAllCourses(false)
    }

    const sortedCourses = getSortedCourses()


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
            {/* Hero Section */}
            <div className="relative w-full bg-gradient-to-br from-[#f4f8ff] via-[#ffffff] to-[#e6f0fa] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 pt-20 lg:pt-24 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                {/* Decorative Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-[#2A86F7]/10 dark:bg-[#2A86F7]/20 blur-[100px] z-0"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] rounded-full bg[a2e8ff]/5 dark:bg-[#2A86F7]/10 blur-[120px] z-0"></div>
                
                {/* Back Button */}
                <div className="absolute left-4 top-16 lg:top-24 z-[100] flex items-center gap-2 cursor-pointer transition-all group" onClick={() => navigate(-1)}>
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all">
                        <GiReturnArrow size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Back</span>
                </div>

                <div className="mx-auto relative z-10 max-w-maxContentTab lg:max-w-maxContent pt-12">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
                        <span>Home</span>
                        <span>/</span>
                        <span>Catalog</span>
                        <span>/</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            {showAllCourses ? "All Courses" : catalogPageData?.selectedCategory?.name}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        {showAllCourses ? "All Courses" : catalogPageData?.selectedCategory?.name}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mb-6 leading-relaxed">
                        {showAllCourses 
                            ? "Explore our complete collection of courses across all domains. Find the perfect course to kickstart your learning journey." 
                            : catalogPageData?.selectedCategory?.description}
                    </p>
                    <div className="flex flex-wrap gap-6 text-slate-800 dark:text-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <FaBookOpen size={20} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold leading-none">
                                    {showAllCourses ? allCoursesData.length : (catalogPageData?.selectedCategory?.courses?.length || 0)}
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Courses</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <FaUsers size={20} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold leading-none">
                                    {showAllCourses 
                                        ? allCoursesData.reduce((acc, c) => acc + (c.studentsEnroled?.length || 0), 0)
                                        : catalogPageData?.selectedCategory?.courses?.reduce((acc, c) => acc + (c.studentsEnroled?.length || 0), 0)
                                    }
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Students</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter & Sort Section */}
            <div className="w-full bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
                <div className="mx-auto px-4 py-4 max-w-maxContentTab lg:max-w-maxContent">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <FaFilter className="text-slate-500 dark:text-slate-400" />
                            
                            <button
                                onClick={handleShowAllCourses}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    showAllCourses 
                                        ? "bg-blue-600 text-white shadow-md" 
                                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
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
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        !showAllCourses && categoryId === category._id
                                            ? "bg-blue-600 text-white shadow-md" 
                                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                            
                            <span className="text-slate-700 dark:text-slate-300 font-medium ml-2">
                                {sortedCourses.length} Courses
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <FaSortAmountDown />
                                Sort by:
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="popular">Most Popular</option>
                                <option value="rating">Highest Rated</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                            <div className="hidden sm:flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}`}
                                >
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}`}
                                >
                                    List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="w-full px-4 py-12">
                <div className="mx-auto max-w-maxContentTab lg:max-w-maxContent">
                    {sortedCourses.length > 0 ? (
                        <div className={viewMode === "grid" 
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            : "flex flex-col gap-4"
                        }>
                            {sortedCourses.map((course, index) => (
                                <div
                                    key={course._id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <Course_Card course={course} viewMode={viewMode} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaBookOpen className="text-4xl text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No courses available</h3>
                            <p className="text-slate-500 dark:text-slate-400">Check back later for new courses in this category.</p>
                        </div>
                    )}
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Catalog