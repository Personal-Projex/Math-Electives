import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import cors from 'cors';
import Course from './models/Courses.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 8000;

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.9afqhh4.mongodb.net/?retryWrites=true&w=majority`);
}

main().catch((err) => {
    console.log(err)
});

const db = mongoose.connection;

db.on('error', err => {
    console.log(err)
});

db.once('open', () => {
    console.log('Connected to database')
});


app.use(cors({
    origin: 'http://localhost:3000'
}))


app.get('/', (req, res) => {
    console.log('Inside GET endpoint');
    res.status(200).json({ msg: "Inside GET request" });
})


app.use(express.json());


app.post('/register', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    });

    try {

        const userTaken = await User.findOne({ username: req.body.username });
        if (user.username.length > 20) {
            res.status(400).json({ message: "Username too long" });
        } else if (user.username.length < 1) {
            res.status(400).json({ message: "Username too short" });
        } else if (user.password.length > 20) {
            res.status(400).json({ message: "Password too long" });
        } else if (user.password.length < 1) {
            res.status(400).json({ message: "Password too short" });
        }
        else if (userTaken) {
            res.status(404).json({ message: "Username taken" });
        } else {
            const newUser = await user.save();
            res.status(200).json(newUser);
        }
    } catch (err) {
        //res.status(400).json({message: err.message})
    }

})


app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else if (user.password !== req.body.password) {
            res.status(403).json({ message: "Incorrect password" })
        } else {
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

app.post('/addReview', async (req, res) => {
    const roundHalf = (num) => {
        return Math.floor(Math.ceil(num * 2) / 2)
    }

    try {
        const courseCode = req.body.courseCode;
        let overallData = roundHalf(((req.body.reviewManageability + req.body.reviewUsefulness + req.body.reviewEnjoyment) / 3));
        const review = {
            reviewTitle: req.body.reviewTitle,
            reviewText: req.body.reviewText,
            termTaken: req.body.termTaken,
            username: req.body.username,
            reviewDate: (new Date()).toLocaleDateString('en-AU'),
            reviewEnjoyment: req.body.reviewEnjoyment,
            reviewUsefulness: req.body.reviewUsefulness,
            reviewManageability: req.body.reviewManageability,
            reviewOverall: overallData
        }
        const courseObj = await Course.findOne({ 'courseObj.courseCode': courseCode });
        let reviews = courseObj.reviews;
        let ratings = courseObj.ratings;
        await Course.findOneAndUpdate({ 'courseObj.courseCode': courseCode }, {
            $push: {
                reviews: review
            },
            'ratings.overall': roundHalf(((ratings.overall * reviews.length) + overallData) / (reviews.length + 1)),
            'ratings.enjoyment': roundHalf(((ratings.enjoyment * reviews.length) + review.reviewEnjoyment) / (reviews.length + 1)),
            'ratings.usefulness': roundHalf(((ratings.usefulness * reviews.length) + review.reviewUsefulness) / (reviews.length + 1)),
            'ratings.manageability': roundHalf(((ratings.manageability * reviews.length) + review.reviewManageability) / (reviews.length + 1))
        })
        res.sendStatus(200);
    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
})

app.get('/getReviews', async (req, res) => {
    try {
        const courseCode = req.query.courseCode;

        const course = await Course.findOne({ 'courseObj.courseCode': courseCode });
        if (!course) {
            res.status(404).json({ message: "Course not found" });
        }
        res.status(200).send(course.reviews);
    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
})

app.post('/addCourseData', async (req, res) => {
    const courses = req.body;
    for (const course of courses) {
        const courseDeets = new Course({
            courseObj: {
                courseCode: course.code,
                courseName: course.name,
                courseOverview: course.overview,
                courseConditions: course.conditions,
                term1: course.term1,
                term2: course.term2,
                term3: course.term3
            },
            ratings: {
                overall: 0,
                enjoyment: 0,
                usefulness: 0,
                manageability: 0,
            },
            reviews: []
        })
        try {
            const newCourse = await courseDeets.save();
            console.log(newCourse);
        } catch (err) {
            res.status(400).json({ "message": err.message });
        }
    }
    res.sendStatus(200);
})

app.get('/getCourses', async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses) {
            res.status(404).json({ message: "Courses not found" });
        }
        res.status(200).json(courses);
    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
})

app.get('/getCourseInfo', async (req, res) => {
    try {
        const courseCode = req.query.courseCode;
        const course = await Course.findOne({ 'courseObj.courseCode': courseCode });
        if (!course) {
            res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
