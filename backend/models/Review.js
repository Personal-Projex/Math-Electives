import mongoose from 'mongoose';

const ReviewSchema = mongoose.Schema(
    {
        courseCode: {
            type: String,
            required: true
        },
        reviewTitle: {
            type: String,
            required: true
        },
        reviewText: {
            type: String,
            required: true
        },
        termTaken: {
            type: Number,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        reviewEnjoyment: {
            type: Number,
            required: true
        },
        reviewUsefulness: {
            type: Number,
            required: true
        },
        reviewManageability: {
            type: Number,
            required: true
        },
        reviewOverall: {
            type: Number,
            required: true
        }
    }
);

export default mongoose.model('Review', ReviewSchema, 'reviews');
