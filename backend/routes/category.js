const express = require('express');
const { createCategory, showAllCategories, getCategoryPageDetails } = require('../controllers/category');
const { auth } = require('../middleware/auth');
const { isAdminOrInstructor } = require('../middleware/roleAuth');

const router = express.Router();

// Category routes
router.post('/createCategory', auth, isAdminOrInstructor, createCategory);
router.get('/showAllCategories', showAllCategories);
router.post('/getCategoryPageDetails', getCategoryPageDetails);

module.exports = router;
