import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"

// Helper function to validate YouTube URL
const isValidYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
};

export default function SubSectionModal({ modalData, setModalData, add = false, view = false, edit = false }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    control,
  } = useForm()
  
  // Watch the lectureVideoType to show/hide the appropriate input
  const watchVideoType = useWatch({
    control,
    name: 'lectureVideoType',
    defaultValue: edit ? (modalData.videoType || 'upload') : 'upload'
  });

  // console.log("view", view)
  // console.log("edit", edit)
  // console.log("add", add)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      // console.log("modalData", modalData)
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

  // Validate form fields
  const validateForm = (data) => {
    if (!data.lectureTitle?.trim()) {
      toast.error("Lecture title is required");
      return false;
    }
    
    if (!data.lectureDesc?.trim()) {
      toast.error("Lecture description is required");
      return false;
    }
    
    const videoType = data.lectureVideoType || 'upload';
    
    if (videoType === 'youtube') {
      if (!data.lectureVideo?.trim()) {
        toast.error("YouTube URL is required");
        return false;
      }
      if (!isValidYouTubeUrl(data.lectureVideo)) {
        toast.error("Please enter a valid YouTube URL");
        return false;
      }
    } else if (!data.lectureVideo) {
      toast.error("Please upload a video file");
      return false;
    }
    
    return true;
  };

  // Check if form has been updated
  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl ||
      (currentValues.lectureVideoType === 'youtube' && 
       currentValues.lectureVideo !== modalData.videoUrl)
    );
  };

  // Handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues();
    
    // Validate form before submission
    if (!validateForm(currentValues)) {
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    
    // Always include title and description to ensure they're sent
    formData.append("title", currentValues.lectureTitle.trim());
    formData.append("description", currentValues.lectureDesc.trim());
    
    // Handle video update if needed
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      const videoType = currentValues.lectureVideoType || 'upload';
      formData.append("videoType", videoType);
      
      if (videoType === 'youtube') {
        formData.append("videoUrl", currentValues.lectureVideo.trim());
      } else {
        formData.append("video", currentValues.lectureVideo);
      }
    }
    
    setLoading(true);
    try {
      const result = await updateSubSection(formData, token);
      if (result) {
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === modalData.sectionId ? result : section
        );
        const updatedCourse = { ...course, courseContent: updatedCourseContent };
        dispatch(setCourse(updatedCourse));
        toast.success("Lecture updated successfully!");
      }
    } catch (error) {
      console.error("Error updating subsection:", error);
      toast.error(error.response?.data?.message || "Failed to update lecture");
      throw error; // Re-throw to be caught by the form submission
    } finally {
      setLoading(false);
      setModalData(null);
    }
  }

  const onSubmit = async (data) => {
    if (view) return;

    // Validate form before submission
    if (!validateForm(data)) {
      return;
    }

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
        return;
      }
      try {
        await handleEditSubsection();
      } catch (error) {
        // Error is already handled in handleEditSubsection
        return;
      }
      return;
    }

    // Prepare the data object
    const subSectionData = {
      sectionId: modalData,
      title: data.lectureTitle?.trim(),
      description: data.lectureDesc?.trim(),
      videoType: data.lectureVideoType || 'upload',
      video: data.lectureVideo,
      videoUrl: data.lectureVideoType === 'youtube' ? data.lectureVideo?.trim() : undefined
    };
    
    console.log('Submitting subSectionData:', subSectionData);
    
    setLoading(true);
    try {
      const result = await createSubSection(subSectionData, token);
      if (result) {
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === modalData ? result : section
        );
        const updatedCourse = { ...course, courseContent: updatedCourseContent };
        dispatch(setCourse(updatedCourse));
        toast.success("Lecture added successfully!");
        setModalData(null);
      }
    } catch (error) {
      console.error("Error creating subsection:", error);
      toast.error(error.response?.data?.message || "Failed to add lecture");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Video Type Selector */}
          {!view && (
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5">
                Video Source <sup className="text-pink-200">*</sup>
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    {...register("lectureVideoType", { required: true })}
                    value="upload"
                    defaultChecked={!edit || modalData.videoType !== 'youtube'}
                    className="form-radio text-yellow-100"
                  />
                  <span className="text-richblack-5">Upload Video</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    {...register("lectureVideoType", { required: true })}
                    value="youtube"
                    defaultChecked={edit && modalData.videoType === 'youtube'}
                    className="form-radio text-yellow-100"
                  />
                  <span className="text-richblack-5">YouTube URL</span>
                </label>
              </div>
              {errors.lectureVideoType && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please select a video source
                </span>
              )}
            </div>
          )}
          
          {/* Lecture Video Upload */}
          <div className={watchVideoType === 'youtube' ? 'block' : 'hidden'}>
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5">
                YouTube URL <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                {...register("lectureVideo", {
                  required: watchVideoType === 'youtube',
                  validate: (value) => 
                    watchVideoType !== 'youtube' || 
                    isValidYouTubeUrl(value) || 
                    'Please enter a valid YouTube URL'
                })}
                className="form-style w-full"
              />
              {errors.lectureVideo && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  {errors.lectureVideo.message || 'YouTube URL is required'}
                </span>
              )}
            </div>
          </div>
          
          <div className={watchVideoType === 'upload' ? 'block' : 'hidden'}>
            <Upload
              name="lectureVideo"
              label="Upload Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
              accept="video/*"
              required={watchVideoType === 'upload'}
            />
          </div>
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}