const Section = require('../models/section');
const SubSection = require('../models/subSection');
const { uploadImageToCloudinary } = require('../utils/imageUploader');



// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// ================ create SubSection ================
exports.createSubSection = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);
        
        // extract data
        const { title, description, sectionId, videoType = 'upload', videoUrl = '' } = req.body;
        const videoFile = req.files?.video;
        
        console.log('Extracted values:', { title, description, sectionId, videoType, videoUrl, hasVideoFile: !!videoFile });

        // validation
        if (!title || !description || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'Title, description, and section ID are required'
            });
        }

        // Validate based on video type
        if (videoType === 'upload' && !videoFile) {
            return res.status(400).json({
                success: false,
                message: 'Video file is required for upload type'
            });
        }

        if (videoType === 'youtube' && !videoUrl) {
            return res.status(400).json({
                success: false,
                message: 'YouTube URL is required for YouTube type'
            });
        }

        let subSectionData = {
            title,
            description,
            videoType
        };

        if (videoType === 'upload') {
            // Handle uploaded video
            const videoFileDetails = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);
            subSectionData.videoUrl = videoFileDetails.secure_url;
            subSectionData.timeDuration = videoFileDetails.duration || '0:00';
        } else if (videoType === 'youtube') {
            // Handle YouTube URL
            const videoId = getYouTubeVideoId(videoUrl);
            if (!videoId) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid YouTube URL'
                });
            }
            subSectionData.videoUrl = `https://www.youtube.com/embed/${videoId}`;
            subSectionData.videoId = videoId;
            // For YouTube videos, we can't determine duration on our own
            subSectionData.timeDuration = '0:00'; // Default duration
        }

        // Create the subsection first
        const subSectionDetails = await SubSection.create(subSectionData);
        
        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subSection: subSectionDetails._id } },
            { new: true }
        ).populate("subSection")

        // return response
        res.status(200).json({
            success: true,
            data: updatedSection,
            message: 'SubSection created successfully'
        });
    }
    catch (error) {
        console.log('Error while creating SubSection');
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while creating SubSection'
        })
    }
}



// ================ Update SubSection ================
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description, videoType, videoUrl } = req.body;

        // validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: 'subSection ID is required to update'
            });
        }

        // find in DB
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // Update basic fields
        if (title) subSection.title = title;
        if (description) subSection.description = description;
        if (videoType) subSection.videoType = videoType;

        // Handle video update based on type
        if (videoType === 'upload' && req.files?.videoFile) {
            // Handle uploaded video
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = uploadDetails.duration || '0:00';
            subSection.videoId = undefined; // Clear YouTube video ID if it was set
        } else if (videoType === 'youtube' && videoUrl) {
            // Handle YouTube URL
            const videoId = getYouTubeVideoId(videoUrl);
            if (!videoId) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid YouTube URL'
                });
            }
            subSection.videoUrl = `https://www.youtube.com/embed/${videoId}`;
            subSection.videoId = videoId;
            subSection.timeDuration = subSection.timeDuration || '0:00';
        }

        // save data to DB
        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
            success: true,
            data: updatedSection,
            message: "Section updated successfully",
        });
    }
    catch (error) {
        console.error('Error while updating the section')
        console.error(error)
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating the section",
        })
    }
}



// ================ Delete SubSection ================
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        // delete from DB
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        const updatedSection = await Section.findById(sectionId).populate('subSection')

        // In frontned we have to take care - when subsection is deleted we are sending ,
        // only section data not full course details as we do in others 

        // success response
        return res.json({
            success: true,
            data: updatedSection,
            message: "SubSection deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,

            error: error.message,
            message: "An error occurred while deleting the SubSection",
        })
    }
}