import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

import { setCourseViewSidebar } from "../slices/sidebarSlice"
import { HiMenuAlt1 } from 'react-icons/hi'


export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    ; (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
  }, [])

  const { courseViewSidebar } = useSelector(state => state.sidebar)

  useEffect(() => {
    if (isMobile) {
      dispatch(setCourseViewSidebar(false))
    } else {
      dispatch(setCourseViewSidebar(true))
    }
  }, [isMobile])

  const toggleSidebar = () => {
    dispatch(setCourseViewSidebar(!courseViewSidebar))
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-white dark:bg-richblack-900">
      {/* Sidebar - Desktop: inline, Mobile: fixed overlay */}
      <div
        className={`
          ${isMobile ? 'fixed inset-0 z-50' : 'relative'}
          ${courseViewSidebar ? 'w-full sm:w-[320px]' : 'w-0 sm:w-[320px]'}
          transition-all duration-300 ease-in-out
        `}
      >
        {courseViewSidebar && (
          <VideoDetailsSidebar
            setReviewModal={setReviewModal}
            isMobile={isMobile}
            onClose={() => dispatch(setCourseViewSidebar(false))}
          />
        )}
      </div>

      {/* Mobile overlay backdrop */}
      {isMobile && courseViewSidebar && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
          onClick={() => dispatch(setCourseViewSidebar(false))}
        />
      )}

      {/* Mobile Toggle Button */}
      {isMobile && !courseViewSidebar && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-4 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 dark:bg-yellow-200 text-richblack-900 dark:text-richblack-800 shadow-lg"
        >
          <HiMenuAlt1 size={28} />
        </button>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${isMobile ? 'w-full' : ''}`}>
        <div className={`px-4 py-6 bg-white dark:bg-richblack-900 min-h-full ${isMobile ? 'pt-20' : 'mx-6 mt-14'}`}>
          <Outlet />
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}
