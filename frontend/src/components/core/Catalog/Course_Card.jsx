import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaStar, FaClock, FaUserGraduate } from "react-icons/fa"
import { FiArrowRight } from "react-icons/fi"

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
      <Link to={`/courses/${course._id}`} className="block group">
        <div className="bg-[#0a1120] border border-white/10 rounded-xl hover:border-blue-500/30 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row">
          <div className="sm:w-72 flex-shrink-0 relative overflow-hidden">
            <Img
              src={course?.thumbnail}
              alt="course thumbnail"
              className="h-full w-full object-cover min-h-[160px] group-hover:scale-105 transition-transform duration-500"
            />
            {discountPercentage > 0 && (
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-bold rounded-full">
                {discountPercentage}% OFF
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60"></div>
          </div>
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                {course?.courseName}
              </h3>
              <p className="text-sm text-slate-400 mb-3">
                By <span className="text-blue-400">{course?.instructor?.firstName} {course?.instructor?.lastName}</span>
              </p>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                {course?.courseDescription}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-slate-400">
                <FaStar className="text-yellow-500" />
                <span className="font-medium text-white">{avgReviewCount || 0}</span>
                <span className="text-slate-500">({course?.ratingAndReviews?.length || 0})</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <FaUserGraduate />
                <span>{course?.studentsEnrolled?.length || 0} students</span>
              </div>
              {course?.totalDuration && (
                <div className="flex items-center gap-1 text-slate-400">
                  <FaClock />
                  <span>{course?.totalDuration}</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {course?.price > 0 ? (
                  <>
                    <span className="text-2xl font-bold text-white">₹{course?.price}</span>
                    {course?.originalPrice > course?.price && (
                      <span className="text-lg text-slate-500 line-through">₹{course?.originalPrice}</span>
                    )}
                  </>
                ) : (
                  <span className="text-2xl font-bold text-emerald-400">Free</span>
                )}
              </div>
              <span className="text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                View Details <FiArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/courses/${course._id}`} className="block group">
      <div className="bg-[#0a1120] border border-white/10 rounded-xl hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden">
          <Img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`${Height || "h-[200px]"} w-full object-cover group-hover:scale-110 transition-transform duration-500`}
          />
          {discountPercentage > 0 && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-bold rounded-full shadow-lg">
              {discountPercentage}% OFF
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60"></div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <FiArrowRight className="text-white text-xl" />
            </div>
          </div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
            {course?.courseName}
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500 text-xs" />
              <span className="text-sm font-medium text-white">{avgReviewCount || 0}</span>
            </div>
            <span className="text-slate-500 text-xs">({course?.ratingAndReviews?.length || 0} ratings)</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
            <div className="flex items-center gap-1">
              <FaUserGraduate />
              <span>{course?.studentsEnrolled?.length || 0}</span>
            </div>
            {course?.totalDuration && (
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{course?.totalDuration}</span>
              </div>
            )}
          </div>
          
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              {course?.price > 0 ? (
                <>
                  <span className="text-xl font-bold text-white">₹{course?.price}</span>
                  {course?.originalPrice > course?.price && (
                    <span className="text-sm text-slate-500 line-through">₹{course?.originalPrice}</span>
                  )}
                </>
              ) : (
                <span className="text-xl font-bold text-emerald-400">Free</span>
              )}
            </div>
            <span className="text-blue-400 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Details <FiArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card
