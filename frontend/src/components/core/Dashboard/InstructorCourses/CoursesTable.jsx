
import { useDispatch, useSelector } from "react-redux"

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import { deleteCourse, fetchInstructorCourses, } from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"
import Img from './../../../common/Img';
import toast from 'react-hot-toast'





export default function CoursesTable({ courses, setCourses, loading, setLoading }) {

  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 25

  // delete course
  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    const toastId = toast.loading('Deleting...');
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
    toast.dismiss(toastId)
    // console.log("All Course ", courses)
  }


    // Loading Skeleton
  const skItem = () => {
    return (
      <div className="flex border-b border-richblack-200 dark:border-richblack-800 px-6 py-8 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className='h-[148px] min-w-[300px] rounded-xl skeleton '></div>

          <div className="flex flex-col w-[40%]">
            <p className="h-5 w-[50%] rounded-xl skeleton"></p>
            <p className="h-20 w-[60%] rounded-xl mt-3 skeleton"></p>

            <p className="h-2 w-[20%] rounded-xl skeleton mt-3"></p>
            <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-richblack-200 dark:border-richblack-800 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <Thead>
            <Tr className="bg-richblack-50 dark:bg-richblack-700">
              <Th className="w-[45%] text-left text-sm font-medium uppercase text-richblack-500 dark:text-richblack-100 p-4">
                Courses
              </Th>
              <Th className="w-[15%] text-left text-sm font-medium uppercase text-richblack-500 dark:text-richblack-100 p-4">
                Duration
              </Th>
              <Th className="w-[15%] text-left text-sm font-medium uppercase text-richblack-500 dark:text-richblack-100 p-4">
                Price
              </Th>
              <Th className="w-[25%] text-left text-sm font-medium uppercase text-richblack-500 dark:text-richblack-100 p-4">
                Actions
              </Th>
            </Tr>
          </Thead>

          {/* Loading Skeleton */}
          {loading && (
            <Tbody>
              {[1, 2, 3].map((item) => (
                <Tr key={item}>
                  <Td colSpan="4" className="p-0">
                    {skItem()}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}

          {!loading && courses?.length === 0 ? (
            <Tbody>
              <Tr>
                <Td colSpan="4" className="py-10 text-center text-2xl font-medium text-richblack-500 dark:text-richblack-100">
                  No courses found
                </Td>
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {courses?.map((course) => (
                <Tr key={course._id} className="border-t border-richblack-200 dark:border-richblack-800 hover:bg-richblack-50 dark:hover:bg-richblack-900/50 transition-colors">
                  <Td className="p-4">
                    <div className="flex items-start gap-4">
                      <Img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="h-[148px] w-[270px] rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-richblack-900 dark:text-richblack-5 capitalize">
                          {course.courseName}
                        </h3>
                        <p className="mt-1 text-xs text-richblack-500 dark:text-richblack-300 line-clamp-3">
                          {course.courseDescription}
                        </p>
                        <div className="mt-3 space-y-1 text-sm">
                          <p className="text-richblack-700 dark:text-richblack-200">
                            Created: <span className="text-richblack-900 dark:text-richblack-100">{formatDate(course?.createdAt)}</span>
                          </p>
                          <p className="text-richblack-700 dark:text-richblack-200">
                            Updated: <span className="text-richblack-900 dark:text-richblack-100">{formatDate(course?.updatedAt)}</span>
                          </p>
                        </div>
                        {course.status === COURSE_STATUS.DRAFT ? (
                          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-richblack-100 dark:bg-richblack-700 px-3 py-1 text-xs font-medium text-pink-500 dark:text-pink-100">
                            <HiClock size={12} />
                            Drafted
                          </span>
                        ) : (
                          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-richblack-100 dark:bg-richblack-700 px-3 py-1 text-xs font-medium text-yellow-600 dark:text-yellow-100">
                            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-600 dark:bg-yellow-100 text-richblack-5 dark:text-richblack-700">
                              <FaCheck size={8} />
                            </span>
                            Published
                          </span>
                        )}
                      </div>
                    </div>
                  </Td>
                  <Td className="p-4 text-sm font-medium text-richblack-700 dark:text-richblack-100">
                    2hr 30min
                  </Td>
                  <Td className="p-4 text-sm font-medium text-richblack-700 dark:text-richblack-100">
                    ₹{course.price}
                  </Td>
                  <Td className="p-4">
                    <div className="flex items-center space-x-4">
                      <button
                        disabled={loading}
                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                        title="Edit"
                        className="p-2 text-richblack-500 dark:text-richblack-200 hover:text-caribbeangreen-400 dark:hover:text-caribbeangreen-300 transition-colors"
                        aria-label={`Edit ${course.courseName}`}
                      >
                        <FiEdit2 size={20} />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Delete Course",
                            text2: "Are you sure you want to delete this course? This action cannot be undone.",
                            btn1Text: loading ? "Deleting..." : "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: !loading ? () => handleCourseDelete(course._id) : null,
                            btn2Handler: () => setConfirmationModal(null),
                          });
                        }}
                        title="Delete"
                        className="p-2 text-richblack-500 dark:text-richblack-200 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        aria-label={`Delete ${course.courseName}`}
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </div>
  )
}
