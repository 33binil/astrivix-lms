import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData, getTotalStudentsCount } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"
import Img from './../../common/Img';



export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])
  const [totalStudentsCount, setTotalStudentsCount] = useState(0)

  // get Instructor Data and total students count
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [instructorApiData, result, totalStudents] = await Promise.all([
          getInstructorData(token),
          fetchInstructorCourses(token),
          getTotalStudentsCount(token) // Fetch total students count
        ])
        
        if (instructorApiData.length) setInstructorData(instructorApiData)
        if (result) setCourses(result)
        setTotalStudentsCount(totalStudents || 0)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [token])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)

  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)


  // skeleton loading
  const skItem = () => {
    return (
      <div className="mt-5 w-full flex flex-col justify-between rounded-xl">
        <div className="flex border p-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a1120]">
          <div className="w-full">
            <p className="w-[100px] h-4 rounded-xl skeleton bg-slate-200 dark:bg-slate-700"></p>
            <div className="mt-3 flex gap-x-5">
              <p className="w-[200px] h-4 rounded-xl skeleton bg-slate-200 dark:bg-slate-700"></p>
              <p className="w-[100px] h-4 rounded-xl skeleton bg-slate-200 dark:bg-slate-700"></p>
            </div>

            <div className="flex justify-center items-center flex-col">
              <div className="w-[80%] h-24 rounded-xl mt-5 skeleton bg-slate-200 dark:bg-slate-700"></div>
              {/* circle */}
              <div className="w-60 h-60 rounded-full mt-4 grid place-items-center skeleton bg-slate-200 dark:bg-slate-700"></div>
            </div>
          </div>
          {/* right column */}
          <div className="sm:flex hidden min-w-[250px] flex-col rounded-xl p-6 skeleton bg-slate-200 dark:bg-slate-700"></div>
        </div>

        {/* bottom row */}
        <div className="flex flex-col gap-y-6 mt-5">
          <div className="flex justify-between">
            <p className="text-lg font-bold text-slate-800 dark:text-white pl-5">Your Courses</p>
            <Link to="/dashboard/my-courses">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pr-5">View All</p>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <p className="h-[201px] w-full rounded-xl skeleton bg-slate-200 dark:bg-slate-700"></p>
            <p className="h-[201px] w-full rounded-xl skeleton bg-slate-200 dark:bg-slate-700"></p>
            <p className="h-[201px] w-full rounded-xl skeleton bg-slate-200 dark:bg-slate-700"></p>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="w-full transition-colors duration-500">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-boogaloo text-slate-800 dark:text-white text-center sm:text-left">
          Hii {user?.firstName} 
        </h1>
        <p className="font-medium text-slate-600 dark:text-slate-400 text-center sm:text-left">
          Let's start something new
        </p>
      </div>


      {loading ? (
        <div>
          {skItem()}
        </div>
      )
        :
        courses.length > 0 ? (
          <div>
            <div className="my-4 flex h-[450px] space-x-4 flex-col lg:flex-row">
              {/* Render chart / graph */}
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="flex-1 rounded-md bg-white dark:bg-[#0a1120] p-6 border border-slate-200 dark:border-slate-700">
                  <p className="text-lg font-bold text-slate-800 dark:text-white">Visualize</p>
                  <p className="mt-4 text-xl font-medium text-slate-600 dark:text-slate-400">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}

              {/* left column */}
              {/* Total Statistics */}
              <div className="flex min-w-[250px] flex-col rounded-md bg-white dark:bg-[#0a1120] p-6 border border-slate-200 dark:border-slate-700">
                <p className="text-lg font-bold text-slate-800 dark:text-white">Statistics</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-lg text-slate-600 dark:text-slate-400">Total Courses</p>
                    <p className="text-3xl font-semibold text-slate-800 dark:text-white">
                      {courses.length}
                    </p>
                  </div>
                
                  <div>
                    <p className="text-lg text-slate-600 dark:text-slate-400">Total Students</p>
                    <p className="text-3xl font-semibold text-slate-800 dark:text-white">
                      {totalStudentsCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-slate-600 dark:text-slate-400">Total Income</p>
                    <p className="text-3xl font-semibold text-slate-800 dark:text-white">
                      Rs. {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Render 3 courses */}
            <div className="rounded-md bg-white dark:bg-[#0a1120] p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-slate-800 dark:text-white">Your Courses</p>
                <Link to="/dashboard/my-courses">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">View All</p>
                </Link>
              </div>

              <div className="my-4 flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 ">
                {courses.slice(0, 3).map((course) => (
                  <div key={course._id} className="sm:w-1/3 flex flex-col items-center justify-center">
                    <Img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[201px] w-full rounded-2xl object-cover"
                    />

                    <div className="mt-3 w-full">
                      <p className="text-sm font-medium text-slate-800 dark:text-white">
                        {course.courseName}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {course.studentsEnrolled.length} students
                        </p>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          |
                        </p>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Rs. {course.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-md bg-white dark:bg-[#0a1120] p-6 py-20 border border-slate-200 dark:border-slate-700">
            <p className="text-center text-2xl font-bold text-slate-800 dark:text-white">
              You have not created any courses yet
            </p>

            <Link to="/dashboard/add-course">
              <p className="mt-1 text-center text-lg font-semibold text-blue-600 dark:text-blue-400">
                Create a course
              </p>
            </Link>
          </div>
        )}
    </div>
  )
}
