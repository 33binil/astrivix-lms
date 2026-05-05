import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Img from './../../common/Img';


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

  return (
    <>
      <div
        className={`flex flex-col gap-6 rounded-3xl bg-white dark:bg-slate-900 p-6 text-slate-800 dark:text-slate-100 shadow-[0_20px_50px_rgba(8,112,184,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 transition-all duration-300`}
      >
        {/* Course Image */}
        <div className="relative group overflow-hidden rounded-2xl">
           <Img
             src={ThumbnailImage}
             alt={course?.courseName}
             className="max-h-[220px] min-h-[180px] w-full overflow-hidden rounded-2xl object-cover transform group-hover:scale-105 transition-transform duration-500"
           />
           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">Rs. {CurrentPrice}</span>
            <span className="text-sm text-slate-400 line-through">Rs. {CurrentPrice * 2}</span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">50% OFF</span>
          </div>
          
          <div className="flex flex-col gap-3 mt-4">
            <button
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 transform active:scale-95 transition-all duration-200"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="w-full py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
                Add to Cart
              </button>
            )}
          </div>

          <p className="py-4 text-center text-xs font-medium text-slate-400 uppercase tracking-widest">
            30-Day Money-Back Guarantee
          </p>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              This course includes:
            </p>
            <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className="flex items-center gap-3" key={i}>
                    <BsFillCaretRightFill className="text-blue-600 dark:text-blue-400" />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-full transition-all"
              onClick={handleShare}
            >
              <FaShareSquare size={14} /> Share this course
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard