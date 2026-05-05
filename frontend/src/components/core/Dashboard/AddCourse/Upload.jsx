import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud, FiYoutube } from "react-icons/fi"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function Upload({ name, label, register, setValue, errors, video = false, viewData = null, editData = null }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(viewData || editData || "");
  const [isYoutubeUrl, setIsYoutubeUrl] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const inputRef = useRef(null);

  // Set initial state based on viewData or editData
  useEffect(() => {
    if (viewData || editData) {
      const isYoutube = (viewData || editData).includes('youtube.com') || (viewData || editData).includes('youtu.be');
      setIsYoutubeUrl(isYoutube);
      if (isYoutube) {
        setYoutubeUrl(viewData || editData);
      }
    }
  }, [viewData, editData]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setIsYoutubeUrl(false);
      setYoutubeUrl("");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    disabled: isYoutubeUrl,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: !isYoutubeUrl });
    register(`${name}Type`, { value: isYoutubeUrl ? 'youtube' : 'upload' });
  }, [register, isYoutubeUrl]);

  useEffect(() => {
    if (isYoutubeUrl) {
      setValue(name, youtubeUrl);
      setValue(`${name}Type`, 'youtube');
      if (youtubeUrl) {
        const videoId = getYouTubeVideoId(youtubeUrl);
        if (videoId) {
          setPreviewSource(`https://www.youtube.com/embed/${videoId}`);
        }
      } else {
        setPreviewSource("");
      }
    } else {
      setValue(name, selectedFile);
      setValue(`${name}Type`, 'upload');
    }
  }, [selectedFile, youtubeUrl, isYoutubeUrl, setValue, name]);

  const toggleYoutubeInput = (e) => {
    e.stopPropagation();
    setIsYoutubeUrl(!isYoutubeUrl);
    if (isYoutubeUrl) {
      setYoutubeUrl("");
      setPreviewSource("");
    } else {
      setSelectedFile(null);
      setPreviewSource("");
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm text-richblack-900 dark:text-richblack-5" htmlFor={name}>
          {label} {!viewData && <sup className="text-pink-200">*</sup>}
        </label>
        {video && !viewData && (
          <button
            type="button"
            onClick={toggleYoutubeInput}
            className={`flex items-center gap-1 text-xs ${isYoutubeUrl ? 'text-yellow-600 dark:text-yellow-50' : 'text-richblack-500 dark:text-richblack-300'
              }`}
          >
            <FiYoutube className="text-base" />
            {isYoutubeUrl ? 'Switch to File Upload' : 'Add YouTube URL'}
          </button>
        )}
      </div>

      {isYoutubeUrl ? (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Paste YouTube URL here"
            value={youtubeUrl}
            onChange={(e) => {
              const url = e.target.value;
              setYoutubeUrl(url);
              const videoId = getYouTubeVideoId(url);
              if (videoId) {
                setPreviewSource(`https://www.youtube.com/embed/${videoId}`);
              } else if (url === '') {
                setPreviewSource("");
              }
            }}
            className="form-style w-full"
            disabled={viewData}
          />
          {youtubeUrl && !getYouTubeVideoId(youtubeUrl) && (
            <p className="text-xs text-pink-200">Please enter a valid YouTube URL</p>
          )}
          {previewSource && (
            <div className="mt-4 aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={previewSource}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
              {!viewData && (
                <button
                  type="button"
                  onClick={() => {
                    setYoutubeUrl("");
                    setPreviewSource("");
                  }}
                  className="mt-2 text-sm text-richblack-400 underline"
                >
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          className={`${isDragActive ? "bg-richblack-200 dark:bg-richblack-600" : "bg-richblack-100 dark:bg-richblack-700"
            } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        >
          {previewSource ? (
            <div className="flex w-full flex-col p-6">
              {!video ? (
                <img
                  src={previewSource}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <div className="w-full">
                  <Player aspectRatio="16:9" playsInline src={previewSource} />
                </div>
              )}

              {!viewData && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewSource("");
                    setSelectedFile(null);
                    setValue(name, null);
                  }}
                  className="mt-3 text-richblack-400 underline"
                >
                  Cancel
                </button>
              )}
            </div>
          ) : (
            <div className="flex w-full flex-col items-center p-6" {...getRootProps()}>
              <input {...getInputProps()} ref={inputRef} disabled={viewData} />
              <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-100 dark:bg-pure-greys-800">
                <FiUploadCloud className="text-2xl text-yellow-600 dark:text-yellow-50" />
              </div>
              <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-500 dark:text-richblack-200">
                Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                <span className="font-semibold text-yellow-600 dark:text-yellow-50">Browse</span> a file
              </p>
              <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-500 dark:text-richblack-200">
                <li>
                  <p className="text-richblack-700 dark:text-richblack-100">Aspect ratio 16:9</p>
                  <p className="mt-1">Recommended 720x480 or higher</p>
                </li>
                <li>
                  <p className="text-richblack-700 dark:text-richblack-100">Less than 2 MB</p>
                  <p className="mt-1">PNG, JPG, JPEG</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
      {errors[name] && !isYoutubeUrl && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
      {isYoutubeUrl && !getYouTubeVideoId(youtubeUrl) && youtubeUrl && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Please enter a valid YouTube URL
        </span>
      )}
    </div>
  );
}