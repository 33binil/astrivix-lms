import React, { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
        <div className={`flex items-center gap-3`}>
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 flex items-center justify-center text-slate-500 group-hover:text-blue-600 transition-colors">
            <HiOutlineVideoCamera size={16} />
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{subSec?.title}</p>
        </div>
        <div className="text-xs font-bold text-slate-400 group-hover:text-slate-500 transition-colors">
           {subSec?.duration || "10m"}
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion