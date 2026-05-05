const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [
    {
      type: String,
    },
  ],
  demoUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  additionalImages: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  projectIntroduction: {
    type: String,
  },
  projectIncluded: [
    {
      type: String,
    },
  ],
  softwareDetails: {
    type: String,
  },
  hardwareDetails: {
    type: String,
  },
  shippingDetails: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update timestamps
projectSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Project", projectSchema);
