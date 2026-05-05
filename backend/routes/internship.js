const express = require("express");
const router = express.Router();
const {
  getAllInternships,
  getAllInternshipsAdmin,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
} = require("../controllers/internship");

// Public routes - get all active internships
router.get("/getAllInternships", getAllInternships);

// Admin routes - get all internships (including inactive)
router.get("/getAllInternshipsAdmin", getAllInternshipsAdmin);

// Public route - get single internship by ID
router.get("/getInternship/:internshipId", getInternshipById);

// Admin routes - create, update, delete internship
router.post("/createInternship", createInternship);
router.put("/updateInternship/:internshipId", updateInternship);
router.delete("/deleteInternship/:internshipId", deleteInternship);

module.exports = router;
