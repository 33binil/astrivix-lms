const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Course = require('./models/Course');
const CourseProgress = require('./models/CourseProgress');

async function run() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to DB.");

    const email = "appuvava1520@gmail.com";
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found: ", email);
      process.exit(1);
    }

    const course = await Course.findOne({ courseName: { $regex: /UI UX/i } });
    if (!course) {
      console.log("Course matching 'UI UX' not found.");
      
      // Let's print out the course names to help debug
      const allCourses = await Course.find({}).select("courseName");
      console.log("Available courses:", allCourses.map(c => c.courseName));

      process.exit(1);
    }

    console.log(`Found user: ${user.firstName} ${user.lastName}`);
    console.log(`Found course: ${course.courseName}`);

    // Check if user already enrolled
    if (user.courses.includes(course._id)) {
      console.log("User is already enrolled in this course.");
    } else {
      user.courses.push(course._id);
      console.log("Added course to user's courses array.");
    }

    if (course.studentsEnrolled.includes(user._id)) {
      console.log("User is already in course's enrolled students.");
    } else {
      course.studentsEnrolled.push(user._id);
      console.log("Added user to course's studentsEnrolled array.");
    }

    // create course progress if not exists for this course
    const existingProgress = await CourseProgress.findOne({ courseID: course._id, userId: user._id });
    if (!existingProgress) {
      const courseProgress = await CourseProgress.create({
        courseID: course._id,
        userId: user._id,
        completedVideos: [],
      });
      user.courseProgress.push(courseProgress._id);
      console.log("Created Course Progress and added to user.");
    } else {
      console.log("Course Progress already exists.");
    }

    await user.save();
    await course.save();

    console.log("Successfully updated database!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from DB.");
  }
}

run();
