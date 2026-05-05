
import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"

import GetAvgRating from "../utils/avgRating"
import { ACCOUNT_TYPE } from './../utils/constants';
import { addToCart } from "../slices/cartSlice"

import { GiReturnArrow } from 'react-icons/gi'
import { MdOutlineVerified } from 'react-icons/md'
import Img from './../components/common/Img';
import toast from "react-hot-toast"




function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { courseId } = useParams()

  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    const fectchCourseDetailsData = async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    }
    fectchCourseDetailsData();
  }, [courseId])

  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(Number(count) || 0)
  }, [response])

  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  if (paymentLoading || loading || !response) {
    return (
      <div className={`mt-24 p-5 flex flex-col justify-center gap-4`}>
        <div className="flex flex-col sm:flex-col-reverse gap-4">
          <p className="h-44 sm:h-24 sm:w-[60%] rounded-xl skeleton"></p>
          <p className="h-9 sm:w-[39%] rounded-xl skeleton"></p>
        </div>
        <p className="h-4 w-[55%] lg:w-[25%] rounded-xl skeleton"></p>
        <p className="h-4 w-[75%] lg:w-[30%] rounded-xl skeleton"></p>
        <p className="h-4 w-[35%] lg:w-[10%] rounded-xl skeleton"></p>
        <div className="right-[1.5rem] top-[20%] hidden lg:block lg:absolute min-h-[450px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 rounded-xl skeleton"></div>
        <p className="mt-24 h-60 lg:w-[60%] rounded-xl skeleton"></p>
      </div>
    )
  }


  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    tag
  } = response?.data?.courseDetails

  const handleBuyCourse = () => {
    if (token) {
      const coursesId = [courseId]
      buyCourse(token, coursesId, user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(response?.data.courseDetails))
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



  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#000814] transition-colors duration-500">
        <div className="relative w-full bg-gradient-to-br from-[#f4f8ff] via-[#ffffff] to-[#e6f0fa] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-[#2A86F7]/10 dark:bg-[#2A86F7]/20 blur-[100px] z-0"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] rounded-full bg-[#2A86F7]/5 dark:bg-[#2A86F7]/10 blur-[120px] z-0"></div>
          
          <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
            <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">

              <div className="absolute left-4 top-16 lg:top-24 z-[100] flex items-center gap-2 cursor-pointer transition-all group" onClick={() => navigate(-1)}>
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all">
                  <GiReturnArrow size={20} />
                </div>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Back</span>
              </div>

              <div className="relative block max-h-[30rem] pt-20 lg:pt-24 lg:hidden mb-6">
                <Img src={thumbnail} alt="course thumbnail" className="aspect-auto w-full rounded-[2rem] shadow-lg border-2 border-white dark:border-slate-800" />
              </div>

              <div className="mb-5 flex flex-col justify-center gap-4 pb-5 text-lg relative z-10">
                <p className="text-4xl font-bold text-slate-900 dark:text-white sm:text-[48px] tracking-tight">{courseName}</p>
                <p className="text-slate-600 dark:text-slate-400 max-w-[810px] leading-relaxed">{courseDescription}</p>

                <div className="text-md flex flex-wrap items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">{avgReviewCount.toFixed(1)}</span>
                  <RatingStars Review_Count={Number(avgReviewCount) || 0} Star_Size={20} />
                  <span className="text-slate-500">{`(${ratingAndReviews.length} reviews)`}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full mx-1"></span>
                  <span className="text-slate-500">{`${studentsEnrolled.length} students enrolled`}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <MdOutlineVerified />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300"> Created By <span className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">{instructor.firstName} {instructor.lastName}</span></p>
                </div>

                <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
                  <p className="flex items-center gap-2"><BiInfoCircle className="text-lg" /> Last updated {formatDate(createdAt)}</p>
                  <p className="flex items-center gap-2"> <HiOutlineGlobeAlt className="text-lg" /> English</p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 border-y border-slate-200 dark:border-slate-800 py-6 lg:hidden">
                <div className="flex items-baseline gap-2 pb-4">
                  <p className="text-4xl font-bold text-slate-900 dark:text-white font-inter tracking-tight">Rs. {price}</p>
                  <span className="text-sm text-slate-400 line-through">Rs. {price * 2}</span>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">50% OFF</span>
                </div>
                <button className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-lg" onClick={user && studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}>
                  {user && studentsEnrolled.includes(user?._id) ? "Go To Course" : "Buy Now"}
                </button>
                {(!user || !studentsEnrolled.includes(user?._id)) && (
                  <button onClick={handleAddToCart} className="w-full py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700 active:scale-95 transition-all text-lg">
                    Add to Cart
                  </button>
                )}
              </div>
            </div>

            <div className="right-[1.5rem] top-[60px] mx-auto hidden lg:block lg:absolute min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0">
              <CourseDetailsCard course={response?.data?.courseDetails} setConfirmationModal={setConfirmationModal} handleBuyCourse={handleBuyCourse} />
            </div>
          </div>
        </div>

        <div className="mx-auto box-content px-4 text-start lg:w-[1260px] pb-24">
          <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">

            <div className="my-12 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What you'll learn</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whatYouWillLearn && whatYouWillLearn.split('\n').map((line, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <MdOutlineVerified size={12} />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Related Tags:</p>
              <div className="flex flex-wrap gap-2">
                {tag && tag.map((item, ind) => (
                  <span key={ind} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Course Explanation</p>
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                {response?.data?.courseDetails?.demoVideoType === 'youtube' && response?.data?.courseDetails?.demoVideoUrl ? (
                  (() => {
                    let videoUrl = response?.data?.courseDetails?.demoVideoUrl;
                    
                    // Extract video ID from various YouTube URL formats
                    let videoId = '';
                    
                    if (videoUrl.includes('embed/')) {
                      // Already in embed format
                      const match = videoUrl.match(/embed\/([^?&]+)/);
                      videoId = match ? match[1] : '';
                    } else if (videoUrl.includes('watch?v=')) {
                      // Standard watch URL
                      const match = videoUrl.match(/watch\?v=([^&]+)/);
                      videoId = match ? match[1] : '';
                    } else if (videoUrl.includes('youtu.be/')) {
                      // Shortened URL
                      const match = videoUrl.match(/youtu\.be\/([^?&]+)/);
                      videoId = match ? match[1] : '';
                    } else if (videoUrl.match(/^[a-zA-Z0-9_-]{11}$/)) {
                      // Just the video ID
                      videoId = videoUrl;
                    }
                    
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    
                    return (
                      <iframe 
                        src={embedUrl + '?autoplay=1&mute=1&rel=0'} 
                        title="Course Explanation" 
                        className="w-full h-full" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                      />
                    );
                  })()
                ) : response?.data?.courseDetails?.demoVideoUrl ? (
                  <video src={response?.data?.courseDetails?.demoVideoUrl} controls className="w-full h-full" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">
                    <p>No preview video available</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-12 py-12 border-t border-slate-100 dark:border-slate-800">
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-8">About the Author</p>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                <div className="relative">
                  <Img src={instructor.image} alt="Author" className="h-24 w-24 rounded-3xl object-cover shadow-lg border-2 border-white dark:border-slate-700" />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-800">
                    <MdOutlineVerified size={14} />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white capitalize mb-2">{`${instructor.firstName} ${instructor.lastName}`}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-lg mb-4">{instructor?.additionalDetails?.about || "Expert instructor passionate about teaching and helping students achieve their goals."}</p>
                  <div className="flex justify-center sm:justify-start gap-4">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full uppercase tracking-wider">Top Instructor</span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-wider">Verified</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails
