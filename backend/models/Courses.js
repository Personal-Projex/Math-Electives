import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema(
    {
        courseObj: {
            courseCode: {
                type: String,
                required: true
            },
            courseName: {
                type: String,
                required: true
            },
            courseOverview: {
                type: String
            },
            courseConditions: {
                type: String
            },
            term1: {
                type: String
            },
            term2: {
                type: String
            },
            term3: {
                type: String
            }
        },
        ratings: {
            overall: {
                type: Number,
                required: true
            },
            enjoyment: {
                type: Number,
                required: true
            },
            usefulness: {
                type: Number,
                required: true
            },
            manageability: {
                type: Number,
                required: true
            },
        },
        reviews: [{
            reviewTitle: {
                type: String
            },
            reviewText: {
                type: String
            },
            termTaken: {
                type: String
            },
            username: {
                type: String
            },
            reviewDate: {
                type: String
            },
            reviewEnjoyment: {
                type: Number
            },
            reviewUsefulness: {
                type: Number
            },
            reviewManageability: {
                type: Number
            },
            reviewOverall: {
                type: Number
            },
        }]
    }
);

export default mongoose.model('Course', CourseSchema, 'courses');
