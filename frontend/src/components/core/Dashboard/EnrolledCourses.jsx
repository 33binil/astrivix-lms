import { useEffect, useState, useCallback } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import Img from './../../common/Img';
import { FaBookOpen } from "react-icons/fa";



export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [loading, setLoading] = useState(true)

  // fetch all users enrolled courses
  const getEnrolledCourses = useCallback(async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res || []);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getEnrolledCourses();
  }, [getEnrolledCourses])

  // Refresh progress when returning to this page from viewing course
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && location.pathname === '/dashboard/enrolled-courses') {
        setLoading(true)
        getEnrolledCourses()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [location.pathname, getEnrolledCourses])

  // Loading Skeleton
  const sklItem = () => {
    return (
      <div className="flex border border-richblack-200 dark:border-richblack-700 px-5 py-3 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className='h-14 w-14 rounded-lg skeleton '></div>

          <div className="flex flex-col w-[40%] ">
            <p className="h-2 w-[50%] rounded-xl  skeleton"></p>
            <p className="h-2 w-[70%] rounded-xl mt-3 skeleton"></p>
          </div>
        </div>

        <div className="flex flex-[0.4] flex-col ">
          <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          <p className="h-2 w-[40%] rounded-xl skeleton mt-3"></p>
        </div>
      </div>
    )
  }

  // return if loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="spinner"></div>
      </div>
    )
  }

  // return if data is empty
  if (enrolledCourses?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <FaBookOpen className="text-6xl text-richblack-600 dark:text-richblack-400" />
        <p className="text-2xl text-richblack-900 dark:text-richblack-5 font-semibold text-center">
          No Courses Enrolled Yet
        </p>
        <p className="text-richblack-600 dark:text-richblack-400 text-center">
          Start your learning journey by enrolling in a course.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 font-medium text-white transition-colors"
        >
          Browse Courses
        </button>
      </div>
    )
  }



  return (
    <>
      <div className="text-4xl text-richblack-900 dark:text-richblack-5 font-boogaloo text-center sm:text-left">Enrolled Courses</div>
      {
        <div className="my-8 text-richblack-900 dark:text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-2xl bg-richblack-200 dark:bg-richblack-800 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>


          {/* loading Skeleton */}
          {!enrolledCourses && <div >
            {sklItem()}
            {sklItem()}
            {sklItem()}
            {sklItem()}
            {sklItem()}
          </div>}

          {/* Course Names */}
          {
            enrolledCourses?.map((course, i, arr) => (
              <div
                className={`flex flex-col sm:flex-row sm:items-center border border-richblack-200 dark:border-richblack-700 ${i === arr.length - 1 ? "rounded-b-2xl" : "rounded-none"}`}
                key={i}
              >
                <div
                  className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <Img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{course.courseName}</p>
                    <p className="text-xs text-richblack-600 dark:text-richblack-300">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>

                {/* only for smaller devices */}
                {/* duration -  progress */}
                <div className='sm:hidden'>
                  <div className=" px-2 py-3">{course?.totalDuration}</div>

                  <div className="flex sm:w-2/5 flex-col gap-2 px-2 py-3">
                    {/* {console.log('Course ============== ', course.progressPercentage)} */}

                    <p>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                    />
                  </div>
                </div>

                {/* only for larger devices */}
                {/* duration -  progress */}
                <div className="hidden w-1/5 sm:flex px-2 py-3">{course?.totalDuration}</div>
                <div className="hidden sm:flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))
          }
        </div>
      }
    </>
  )
}