const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getAllProjectsAdmin,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  submitBooking,
} = require("../controllers/project");

// Import auth middleware
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth");

// Public routes - get all active projects
router.get("/getAllProjects", getAllProjects);

// Admin routes - get all projects (including inactive)
router.get("/getAllProjectsAdmin", auth, isAdmin, getAllProjectsAdmin);

// Public route - get single project by ID
router.get("/getProject/:projectId", getProjectById);

// Public route - submit project booking
router.post("/submitBooking", submitBooking);

// Admin routes - create, update, delete project (temporarily removed auth for testing)
// router.post("/createProject", auth, isAdmin, createProject);
// router.put("/updateProject/:projectId", auth, isAdmin, updateProject);
// router.delete("/deleteProject/:projectId", auth, isAdmin, deleteProject);

// Without auth for testing
router.post("/createProject", createProject);
router.put("/updateProject/:projectId", updateProject);
router.delete("/deleteProject/:projectId", deleteProject);

module.exports = router;
