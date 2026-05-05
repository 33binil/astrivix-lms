const Category = require('../models/category')

// get Random Integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// ================ create Category ================
exports.createCategory = async (req, res) => {
    try {
        // extract data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const categoryDetails = await Category.create({
            name: name, description: description
        });

        res.status(200).json({
            success: true,
            message: 'Category created successfully'
        });
    }
    catch (error) {
        console.log('Error while creating Category');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while creating Category',
            error: error.message
        })
    }
}


// ================ get All Category ================
exports.showAllCategories = async (req, res) => {
    try {
        // get all category from DB
        const allCategories = await Category.find({}, { name: true, description: true });

        // return response
        res.status(200).json({
            success: true,
            data: allCategories,
            message: 'All allCategories fetched successfully'
        })
    }
    catch (error) {
        console.log('Error while fetching all allCategories');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while fetching all allCategories'
        })
    }
}



// ================ Get Category Page Details ================
exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        console.log('Fetching category page details for ID:', categoryId);

        // Find the category
        const category = await Category.findById(categoryId).lean();
        if (!category) {
            console.log('Category not found with ID:', categoryId);
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Find all published courses in this category
        const Course = require('../models/course');
        const courses = await Course.find({
            category: categoryId,
            status: "Published"
        })
        .populate("instructor")
        .populate("ratingAndReviews")
        .populate({
            path: "studentsEnrolled",
            select: "_id"
        })
        .lean()
        .exec();

        console.log(`Found ${courses.length} published courses for category ${category.name}`);
        
        // Create the selected category object with the found courses
        const selectedCategory = {
            ...category,
            courses: courses || [],
            totalCourses: courses?.length || 0
        };
        
        // Get other categories (for the different category section)
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
            courses: { $exists: true, $not: { $size: 0 } }
        })
        .populate({
            path: "courses",
            match: { status: "Published" },
            select: "_id"
        })
        .lean()
        .exec();

        // Select a random different category that has courses
        let differentCategory = null;
        const categoriesWithCourses = categoriesExceptSelected.filter(cat => cat.courses?.length > 0);
        
        if (categoriesWithCourses.length > 0) {
            const randomIndex = Math.floor(Math.random() * categoriesWithCourses.length);
            differentCategory = await Category.findById(categoriesWithCourses[randomIndex]._id)
                .populate({
                    path: "courses",
                    match: { status: "Published" },
                    populate: [
                        { path: "instructor" },
                        { path: "ratingAndReviews" }
                    ],
                    options: { limit: 4 }
                })
                .lean()
                .exec();
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: [
                    { path: "instructor" },
                    { path: "ratingAndReviews" },
                    { path: "studentsEnrolled", select: "_id" },
                    { path: "category", select: "name" }
                ]
            })
            .lean()
            .exec();

        // Flatten courses from all categories and sort by number of students enrolled
        const allCourses = allCategories.flatMap(category => 
            category.courses ? category.courses.map(course => ({
                ...course,
                category: category.name // Add category name to each course
            })) : []
        );
        
        // Get top 10 most selling courses (most students enrolled)
        const mostSellingCourses = [...allCourses]
            .sort((a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0))
            .slice(0, 10);

        console.log('Successfully fetched category page data');
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory: {
                    ...selectedCategory,
                    courses: selectedCategory.courses || [],
                    totalCourses: selectedCategory.courses?.length || 0
                },
                differentCategory: differentCategory ? {
                    ...differentCategory,
                    courses: differentCategory.courses || [],
                    totalCourses: differentCategory.courses?.length || 0
                } : null,
                mostSellingCourses: mostSellingCourses || []
            },
            message: "Category page data fetched successfully"
        });
    } catch (error) {
        console.error('Error in getCategoryPageDetails:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}