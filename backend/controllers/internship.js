const Internship = require("../models/internship");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Get all internships
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ status: "active" })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      internships,
    });
  } catch (error) {
    console.error("Error fetching internships:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch internships",
      error: error.message,
    });
  }
};

// Get all internships (including inactive - for admin)
exports.getAllInternshipsAdmin = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      internships,
    });
  } catch (error) {
    console.error("Error fetching internships:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch internships",
      error: error.message,
    });
  }
};

// Get internship by ID
exports.getInternshipById = async (req, res) => {
  try {
    const { internshipId } = req.params;
    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      internship,
    });
  } catch (error) {
    console.error("Error fetching internship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch internship",
      error: error.message,
    });
  }
};

// Create new internship
exports.createInternship = async (req, res) => {
  try {
    const internshipData = req.body;
    
    // Parse requirements and skills if they're strings (from FormData)
    let parsedData = { ...internshipData };
    try {
      if (internshipData.requirements && typeof internshipData.requirements === 'string') {
        parsedData.requirements = JSON.parse(internshipData.requirements);
      }
      if (internshipData.skills && typeof internshipData.skills === 'string') {
        parsedData.skills = JSON.parse(internshipData.skills);
      }
    } catch (e) {
      console.log("Parsing error:", e);
    }
    
    // Parse featured and status booleans
    if (internshipData.featured) {
      parsedData.featured = internshipData.featured === 'true' || internshipData.featured === true;
    }
    
    // Handle image upload to Cloudinary
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadResult = await uploadImageToCloudinary(imageFile, "internships");
      parsedData.imageUrl = uploadResult.secure_url;
    }
    
    const newInternship = await Internship.create(parsedData);

    res.status(201).json({
      success: true,
      internship: newInternship,
      message: "Internship created successfully",
    });
  } catch (error) {
    console.error("Error creating internship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create internship",
      error: error.message,
    });
  }
};

// Update internship
exports.updateInternship = async (req, res) => {
  try {
    const { internshipId } = req.params;
    const updateData = req.body;
    
    // Parse requirements and skills if they're strings (from FormData)
    let parsedData = { ...updateData };
    try {
      if (updateData.requirements && typeof updateData.requirements === 'string') {
        parsedData.requirements = JSON.parse(updateData.requirements);
      }
      if (updateData.skills && typeof updateData.skills === 'string') {
        parsedData.skills = JSON.parse(updateData.skills);
      }
    } catch (e) {
      console.log("Parsing error:", e);
    }
    
    // Parse featured and status booleans
    if (updateData.featured) {
      parsedData.featured = updateData.featured === 'true' || updateData.featured === true;
    }

    // Handle new image upload to Cloudinary
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadResult = await uploadImageToCloudinary(imageFile, "internships");
      parsedData.imageUrl = uploadResult.secure_url;
    }

    const internship = await Internship.findByIdAndUpdate(
      internshipId,
      parsedData,
      { new: true, runValidators: true }
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      internship,
      message: "Internship updated successfully",
    });
  } catch (error) {
    console.error("Error updating internship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update internship",
      error: error.message,
    });
  }
};

// Delete internship
exports.deleteInternship = async (req, res) => {
  try {
    const { internshipId } = req.params;

    const internship = await Internship.findByIdAndDelete(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting internship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete internship",
      error: error.message,
    });
  }
};
