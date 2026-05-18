import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaStar, FaClock, FaUserGraduate, FaPlayCircle } from "react-icons/fa"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"
import Img from './../../common/Img';



function Course_Card({ course, Height, viewMode = "grid" }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  const discountPercentage = course?.price && course?.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  if (viewMode === "list") {
    return (
      <Link to={`/courses/${course._id}`} className="block">
        <div className="flex flex-col sm:flex-row bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden group">
          <div className="sm:w-72 flex-shrink-0 relative">
            <Img
              src={course?.thumbnail}
              alt="course thumbnail"
              className="h-full w-full object-cover min-h-[160px] group-hover:scale-105 transition-transform duration-500"
            />
            {discountPercentage > 0 && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                {discountPercentage}% OFF
              </span>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <FaPlayCircle className="text-white text-5xl" />
            </div>
          </div>
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                {course?.courseName}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                By <span className="text-blue-600 dark:text-blue-400">{course?.instructor?.firstName} {course?.instructor?.lastName}</span>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">
                {course?.courseDescription}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <FaStar className="text-yellow-500" />
                <span className="font-medium text-slate-800 dark:text-slate-200">{avgReviewCount || 0}</span>
                <span className="text-slate-500">({course?.ratingAndReviews?.length || 0})</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <FaUserGraduate />
                <span>{course?.studentsEnroled?.length || 0} students</span>
              </div>
              {course?.totalDuration && (
                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <FaClock />
                  <span>{course?.totalDuration}</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-3">
              {course?.price > 0 ? (
                <>
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">₹{course?.price}</span>
                  {course?.originalPrice > course?.price && (
                    <span className="text-lg text-slate-500 line-through">₹{course?.originalPrice}</span>
                  )}
                </>
              ) : (
                <span className="text-2xl font-bold text-green-600">Free</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/courses/${course._id}`} className="block group">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden">
          <Img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`${Height || "h-[200px]"} w-full object-cover group-hover:scale-110 transition-transform duration-500`}
          />
          {discountPercentage > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              {discountPercentage}% OFF
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              View Details
            </span>
          </div>
          <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 dark:bg-slate-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
            <FaPlayCircle className="text-blue-600 text-xl" />
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
            {course?.courseName}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500 text-xs" />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{avgReviewCount || 0}</span>
            </div>
            <span className="text-slate-400 text-xs">({course?.ratingAndReviews?.length || 0} ratings)</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <div className="flex items-center gap-1">
              <FaUserGraduate />
              <span>{course?.studentsEnroled?.length || 0}</span>
            </div>
            {course?.totalDuration && (
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{course?.totalDuration}</span>
              </div>
            )}
          </div>
          
          <div className="mt-auto flex items-center gap-2">
            {course?.price > 0 ? (
              <>
                <span className="text-xl font-bold text-slate-800 dark:text-white">₹{course?.price}</span>
                {course?.originalPrice > course?.price && (
                  <span className="text-sm text-slate-500 line-through">₹{course?.originalPrice}</span>
                )}
              </>
            ) : (
              <span className="text-xl font-bold text-green-600">Free</span>
            )}
          </div>
          <span className="mt-3 w-full py-2 px-4 bg-blue-600 group-hover:bg-blue-700 text-white text-center font-medium rounded-lg transition-colors duration-300 cursor-pointer">
            Course Details
          </span>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card