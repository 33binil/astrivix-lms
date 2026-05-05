import { useEffect, useRef, useState } from "react"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

import { IoMdArrowDropdown } from "react-icons/io"


export default function CourseAccordionBar({ course, isActive, handleActive }) {

  const contentEl = useRef(null)
  const [active, setActive] = useState(false)  // Accordian state
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])


  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])



  return (
    <div className='overflow-hidden border border-solid border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-100 mb-4 rounded-2xl duration-200 shadow-sm'>
      <div>
        <div
          className={`flex cursor-pointer items-start justify-between px-7 py-6 transition-all duration-300`}
          onClick={() => { handleActive(course._id) }}
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-transform duration-300 ${isActive.includes(course._id) ? "rotate-180" : ""}`}>
              <IoMdArrowDropdown size={20} />
            </div>
            <p className="font-bold text-slate-900 dark:text-white">{course?.sectionName}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {`${course.subSection.length || 0} Lectures`}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={contentEl}
        className={`relative h-0 overflow-hidden bg-slate-50/50 dark:bg-black/20 transition-[height] duration-[0.35s] ease-[ease]`}
        style={{ height: sectionHeight, }}
      >
        <div className="flex flex-col gap-1 px-7 py-4">
          {course?.subSection?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}