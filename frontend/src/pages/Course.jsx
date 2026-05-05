import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// import CourseCard from "../components/Catalog/CourseCard"
// import CourseSlider from "../components/Catalog/CourseSlider"
import Footer from "../components/common/Footer"
import Course_Card from '../components/core/Catalog/Course_Card'
import Course_Slider from "../components/core/Catalog/Course_Slider"
import Loading from './../components/common/Loading';

import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import { fetchCourseCategories } from './../services/operations/courseDetailsAPI';




function Course() {

    const { catalogName } = useParams()
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("")

    // Fetch All Categories
    useEffect(() => {
        ; (async () => {
            try {
                const res = await fetchCourseCategories();
                const category_id = res.filter(
                    (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
                )[0]._id
                setCategoryId(category_id)
            } catch (error) {
                console.log("Could not fetch Categories.", error)
            }
        })()
    }, [catalogName])


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

    // console.log('======================================= ', catalogPageData)
    // console.log('categoryId ==================================== ', categoryId)

    if (loading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Loading />
            </div>
        )
    }
    if (!loading && !catalogPageData) {
        return (
            <div className="text-white text-4xl flex justify-center items-center mt-[20%]">
                No Courses found for selected Category
            </div>)
    }



    return (
        <>
            {/* Hero Section */}
            <div className="relative box-content bg-gradient-to-br from-[#f4f8ff] via-[#ffffff] to-[#e6f0fa] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-[#2A86F7]/10 dark:bg-[#2A86F7]/20 blur-[100px] z-0"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] rounded-full bg-[#2A86F7]/5 dark:bg-[#2A86F7]/10 blur-[120px] z-0"></div>
                
                <div className="relative z-10 mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {`Home / Catalog / `}
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            {catalogPageData?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-4xl text-slate-900 dark:text-white font-bold tracking-tight">
                        {catalogPageData?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {catalogPageData?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* Section 1 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="section_heading">Courses to get you started</div>
                    <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                        <option value="">All Courses</option>
                        <option value={catalogPageData?.selectedCategory?.name}>
                            {catalogPageData?.selectedCategory?.name}
                        </option>
                    </select>
                </div>
                <div className="my-4 flex border-b border-slate-300 text-sm">
                    <p
                        className={`px-4 py-2 ${active === 1
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-slate-600"
                            } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Most Populer
                    </p>
                    <p
                        className={`px-4 py-2 ${active === 2
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-slate-600"
                            } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                </div>
                <div>
                    <Course_Slider
                        Courses={catalogPageData?.selectedCategory?.courses}
                    />
                </div>
            </div>

            {/* Section 2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading text-slate-800 font-bold text-2xl mb-6">
                    Top courses in {catalogPageData?.differentCategory?.name}
                </div>
                <div>
                    <Course_Slider
                        Courses={catalogPageData?.differentCategory?.courses}
                    />
                </div>
            </div>

            {/* Section 3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading text-slate-800 font-bold text-2xl mb-6">Frequently Bought</div>
                <div className="py-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {catalogPageData?.mostSellingCourses
                            ?.slice(0, 4)
                            .map((course, i) => (
                                <Course_Card course={course} key={i} Height={"h-[300px]"} />
                            ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Course
