const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    timeDuration: {
        type: String,
        default: '0:00'
    },
    description: {
        type: String,
        trim: true
    },
    videoUrl: {
        type: String,
        trim: true
    },
    videoType: {
        type: String,
        enum: ['upload', 'youtube'],
        default: 'upload'
    },
    videoId: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('SubSection', subSectionSchema) 