const Project = require("../models/project");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { Resend } = require("resend");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "active" })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

// Get all projects (including inactive - for admin)
exports.getAllProjectsAdmin = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message,
    });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const projectData = req.body;
    
    // Parse technologies if it's a string (from FormData)
    let parsedData = { ...projectData };
    try {
      if (projectData.technologies && typeof projectData.technologies === 'string') {
        parsedData.technologies = JSON.parse(projectData.technologies);
      }
      if (projectData.projectIncluded && typeof projectData.projectIncluded === 'string') {
        parsedData.projectIncluded = JSON.parse(projectData.projectIncluded);
      }
    } catch (e) {
      console.log("Parsing error:", e);
    }
    
    // Parse featured and status booleans
    if (projectData.featured) {
      parsedData.featured = projectData.featured === 'true' || projectData.featured === true;
    }
    
    // Handle image upload to Cloudinary
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadResult = await uploadImageToCloudinary(imageFile, "projects");
      parsedData.imageUrl = uploadResult.secure_url;
    }
    
    // Handle additional images upload to Cloudinary
    if (req.files && req.files.additionalImages) {
      const additionalImages = Array.isArray(req.files.additionalImages) 
        ? req.files.additionalImages 
        : [req.files.additionalImages];
      
      const additionalImageUrls = [];
      for (const file of additionalImages) {
        const uploadResult = await uploadImageToCloudinary(file, "projects/additional");
        additionalImageUrls.push(uploadResult.secure_url);
      }
      parsedData.additionalImages = additionalImageUrls;
    }
    
    const newProject = await Project.create(parsedData);

    res.status(201).json({
      success: true,
      project: newProject,
      message: "Project created successfully",
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updateData = req.body;
    
    // Parse technologies if it's a string (from FormData)
    let parsedData = { ...updateData };
    try {
      if (updateData.technologies && typeof updateData.technologies === 'string') {
        parsedData.technologies = JSON.parse(updateData.technologies);
      }
      if (updateData.projectIncluded && typeof updateData.projectIncluded === 'string') {
        parsedData.projectIncluded = JSON.parse(updateData.projectIncluded);
      }
    } catch (e) {
      console.log("Parsing error:", e);
    }
    
    // Parse featured and status booleans
    if (updateData.featured) {
      parsedData.featured = updateData.featured === 'true' || updateData.featured === true;
    }

    // Handle new image upload to Cloudinary
    let imageUrl = parsedData.imageUrl;
    
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadResult = await uploadImageToCloudinary(imageFile, "projects");
      imageUrl = uploadResult.secure_url;
      parsedData.imageUrl = imageUrl;
    }

    // Handle additional images upload to Cloudinary
    if (req.files && req.files.additionalImages) {
      const additionalImages = Array.isArray(req.files.additionalImages) 
        ? req.files.additionalImages 
        : [req.files.additionalImages];
      
      const additionalImageUrls = [];
      for (const file of additionalImages) {
        const uploadResult = await uploadImageToCloudinary(file, "projects/additional");
        additionalImageUrls.push(uploadResult.secure_url);
      }
      parsedData.additionalImages = additionalImageUrls;
    }

    const project = await Project.findByIdAndUpdate(
      projectId,
      parsedData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

// Submit project booking
exports.submitBooking = async (req, res) => {
  try {
    const { firstname, lastname, email, phoneNo, countrycode, company, message, projectId, projectTitle } = req.body;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const companyName = process.env.COMPANY_NAME || 'Our Team';

    const fullName = `${firstname || ''} ${lastname || ''}`.trim();
    const fullPhone = countrycode ? `${countrycode} ${phoneNo || ''}` : phoneNo || '';

    console.log("Sending emails from:", fromEmail, "to admin:", adminEmail);

    // Send email to admin
    try {
      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `🔔 New Project Booking: ${projectTitle || 'Project'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
            <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 20px; border-radius: 10px 10px 0 0;">
              <h2 style="color: #ffffff; margin: 0;">New Project Booking Request</h2>
            </div>
            <div style="background: #ffffff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">Project</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">${projectTitle || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">Customer Name</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">Email</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">${email || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">Phone</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">${fullPhone || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">Company</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">${company || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">Message</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">${message || 'N/A'}</td>
                </tr>
              </table>
              <p style="color: #64748b; font-size: 12px; margin-top: 20px;">📧 This email was sent from the project booking form on your website.</p>
            </div>
          </div>
        `
      });
      console.log("Admin email sent successfully");
    } catch (adminError) {
      console.error("Admin email error:", adminError.message);
    }

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `✅ Booking Received - ${projectTitle || 'Project'} | ${companyName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
            <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
              <h2 style="color: #ffffff; margin: 0;">🎉 Booking Received!</h2>
            </div>
            <div style="background: #ffffff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p style="color: #1e293b; font-size: 16px;">Dear <strong>${fullName}</strong>,</p>
              <p style="color: #475569;">Thank you for your interest in <strong>${projectTitle || 'our project'}</strong>!</p>
              <p style="color: #475569;">✅ Your booking request has been successfully submitted. Our team will review your requirements and get back to you within <strong>24 hours</strong>.</p>
              
              <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0; margin-bottom: 10px;">Your Request Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px; color: #64748b;">📦 Project</td>
                    <td style="padding: 8px; color: #1e293b; font-weight: bold;">${projectTitle || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; color: #64748b;">📧 Email</td>
                    <td style="padding: 8px; color: #1e293b;">${email || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; color: #64748b;">📱 Phone</td>
                    <td style="padding: 8px; color: #1e293b;">${fullPhone || 'N/A'}</td>
                  </tr>
                </table>
              </div>
              
              <p style="color: #64748b; font-size: 14px;">💬 If you have any urgent questions, feel free to reply to this email or contact us at <a href="mailto:${adminEmail}" style="color: #3b82f6;">${adminEmail}</a></p>
              
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
              <p style="color: #64748b; font-size: 12px; text-align: center;">Best regards,<br/><strong>${companyName}</strong> Team</p>
            </div>
          </div>
        `
      });
      console.log("Customer email sent successfully");
    } catch (customerError) {
      console.error("Customer email error:", customerError.message);
    }

    res.status(200).json({
      success: true,
      message: "Booking submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit booking",
      error: error.message,
    });
  }
};
