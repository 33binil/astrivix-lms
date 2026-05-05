import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from './../../common/IconBtn';
import { setCourseViewSidebar } from "../../../slices/sidebarSlice"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import toast from "react-hot-toast"

import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { IoMdClose } from 'react-icons/io'
import { VscCheck } from "react-icons/vsc"


export default function VideoDetailsSidebar({ setReviewModal, isMobile, onClose }) {

  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const [sidebarLoading, setSidebarLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();

  const { courseId, sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  const { token } = useSelector((state) => state.auth)

  const { courseViewSidebar } = useSelector(state => state.sidebar)

  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
      const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  const handleLessonClick = (courseId, sectionId, topicId) => {
    navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${topicId}`)
    setVideoBarActive(topicId)
    if (isMobile && onClose) {
      onClose()
    }
  }

  const handleCheckboxClick = async (e, topicId) => {
    if (completedLectures.includes(topicId)) {
      toast.error("Video already marked as complete")
      return
    }
    
    console.log("Marking video as complete:", { courseId, subsectionId: topicId })
    setSidebarLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: topicId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(topicId))
      toast.success("Video marked as complete!")
    }
    setSidebarLoading(false)
  }

  return (
    <div className="flex h-full w-full flex-col bg-richblack-200 dark:bg-richblack-800 border-r border-richblack-300 dark:border-richblack-600">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-richblack-300 dark:border-richblack-600 bg-richblack-200 dark:bg-richblack-800 px-4 pt-6 pb-4 mt-12">
        {/* Back button */}
        <button
          onClick={() => { navigate(`/dashboard/enrolled-courses`) }}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-richblack-300 dark:bg-richblack-200 text-richblack-700 dark:text-richblack-700 hover:scale-90 hover:bg-richblack-400 dark:hover:bg-richblack-300 transition-colors"
          title="back"
        >
          <IoIosArrowBack size={28} />
        </button>

        {/* Add Review button */}
        <IconBtn
          text="Review"
          customClasses="text-sm px-3 py-2"
          onclick={() => setReviewModal(true)}
        />

        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={onClose}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-richblack-300 dark:bg-richblack-200 text-richblack-700 dark:text-richblack-700 hover:scale-90 cursor-pointer"
          >
            <IoMdClose size={24} />
          </button>
        )}
      </div>

      {/* Course Info */}
      <div className="border-b border-richblack-300 dark:border-richblack-600 p-4 bg-richblack-200 dark:bg-richblack-800">
        <p className="text-lg font-bold text-richblack-800 dark:text-richblack-5">{courseEntireData?.courseName}</p>
        <p className="text-sm font-semibold text-richblack-500 dark:text-richblack-400 mt-1">
          {completedLectures?.length} / {totalNoOfLectures} lessons completed
        </p>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto bg-richblack-100 dark:bg-richblack-900">
        {courseSectionData.map((section, index) => (
          <div key={index} className="text-sm">
            {/* Section Header */}
            <div
              className="flex cursor-pointer items-center justify-between px-4 py-3 transition-colors bg-richblack-200 dark:bg-richblack-700 hover:bg-richblack-300 dark:hover:bg-richblack-600"
              onClick={() => setActiveStatus(activeStatus === section?._id ? "" : section?._id)}
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-richblack-800 dark:text-richblack-25">{section?.sectionName}</span>
                <span className="text-xs text-richblack-500 dark:text-richblack-500">
                  ({section?.subSection.length})
                </span>
              </div>
              <span
                className={`transition-transform duration-200 text-richblack-600 dark:text-richblack-300 ${activeStatus === section?._id ? "rotate-0" : "rotate-180"
                  }`}
              >
                <BsChevronDown />
              </span>
            </div>

            {/* Sub Sections */}
            {activeStatus === section?._id && (
              <div className="bg-richblack-50 dark:bg-richblack-900">
                {section.subSection.map((topic, i) => (
                  <div
                    className={`flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 dark:bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-200 dark:hover:bg-richblack-700"
                    }`}
                    key={i}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!completedLectures.includes(topic?._id)) {
                          handleCheckboxClick(e, topic?._id)
                        }
                      }}
                      className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer
                        ${completedLectures.includes(topic?._id)
                          ? "bg-green-500 border-green-500"
                          : "border-richblack-400 dark:border-richblack-500 hover:border-green-500 hover:bg-richblack-200 dark:hover:bg-richblack-600"
                        }`}
                    >
                      {completedLectures.includes(topic?._id) && (
                        <VscCheck className="text-white text-sm" />
                      )}
                    </div>
                    <span 
                      className={`flex-1 truncate text-sm ${
                        videoBarActive === topic._id
                          ? "text-richblack-800"
                          : "text-richblack-800 dark:text-richblack-5"
                      }`}
                      onClick={() => handleLessonClick(courseEntireData?._id, section?._id, topic?._id)}
                    >
                      {topic.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
