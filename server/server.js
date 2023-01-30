import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import cors from 'cors';
import Course from './models/Courses.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sessionStorage from 'sessionstorage';

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

        if (user.firstName.length < 1) {
            res.status(400).json({ message: "Please fill out your first name" });
        }

        if (user.lastName.length < 1) {
            res.status(400).json({ message: "Please fill out your last name" });
        }

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
            
            const passSecret = user.password.concat(process.env.PASSWORD_TOKEN_SECRET);
            const passCrypt = bcrypt.hashSync(passSecret, 10);
            user.password = passCrypt;
            
            const newUser = await user.save();
            const token = jwt.sign({ username: req.body.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            sessionStorage.setItem('username', req.body.username);
            sessionStorage.setItem('token', token);
            res.status(200).json({ user: newUser, token: token });
        }
    } catch (err) {
        res.status(400);
    }

})


app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else if (bcrypt.compareSync(req.body.password.concat(process.env.PASSWORD_TOKEN_SECRET), user.password) !== true) {
            res.status(403).json({ message: "Incorrect password" })
        } else {
            // User has been authenticated
            const token = jwt.sign({ username: req.body.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

            sessionStorage.setItem('username', req.body.username);
            sessionStorage.setItem('token', token);

            res.status(200).json({ username: req.body.username, token: token });
        }

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


app.delete('/logout', async (req, res) => {
    try {   
        sessionStorage.setItem('token', '');
        res.status(200).json('Token Removed');
    } catch (err) {
        res.status(400);
    }
})

app.post('/addReview', async (req, res) => {

    try {
        const token = sessionStorage.getItem('token');
        const username = sessionStorage.getItem('username');

        const courseCode = req.body.courseCode;
        let overallData = ((req.body.reviewManageability + req.body.reviewUsefulness + req.body.reviewEnjoyment) / 3);
        const review = {
            reviewTitle: req.body.reviewTitle,
            reviewText: req.body.reviewText,
            termTaken: req.body.termTaken,
            username: req.body.addName ? username : "Anonymous",
            reviewDate: (new Date()).toLocaleDateString('en-AU'),
            reviewEnjoyment: req.body.reviewEnjoyment,
            reviewUsefulness: req.body.reviewUsefulness,
            reviewManageability: req.body.reviewManageability,
            reviewOverall: overallData
        }

        // error checking:
        if (token === null || token === '') {
            res.status(400).send({ message: "Please login before reviewing" });
        } else if (!jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
            res.status(400).send({ message: "Please login before reviewing" });
        }
        else if (review.reviewTitle.length < 1) {
            res.status(400).send({ message: "Please fill out the review title" });
        } else if (review.reviewTitle.length >= 60) {
            res.status(400).send({ message: "Title too long. Please use the description" });
        } else if (review.termTaken.length < 1) {
            res.status(400).send({ message: "Please fill out term taken" });
        } else if (!review.termTaken.match(/^([2]{1}[0-3]{1}[Tt]{1}[1-3]{1})/)) {
            res.status(400).send({ message: "Check term taken format (try to keep it after 20T1)" });
        } else if (review.reviewEnjoyment === 0 && review.reviewManageability === 0 && review.reviewUsefulness === 0) {
            res.status(400).send({ message: "Please fill out the star ratings" });
        } else {
            const courseObj = await Course.findOne({ 'courseObj.courseCode': courseCode });
            let reviewsObj = courseObj.reviews;
            let ratings = courseObj.ratings;
            await Course.findOneAndUpdate({ 'courseObj.courseCode': courseCode }, {
                $push: {
                    reviews: review
                },
                'ratings.overall': ((ratings.overall * reviewsObj.length) + overallData) / (reviewsObj.length + 1),
                'ratings.enjoyment': ((ratings.enjoyment * reviewsObj.length) + review.reviewEnjoyment) / (reviewsObj.length + 1),
                'ratings.usefulness': ((ratings.usefulness * reviewsObj.length) + review.reviewUsefulness) / (reviewsObj.length + 1),
                'ratings.manageability': ((ratings.manageability * reviewsObj.length) + review.reviewManageability) / (reviewsObj.length + 1)
            })
            res.sendStatus(200);
        }
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
        //res.status(400).json({ "message": err.message });
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
                term3: course.term3,
                major: course.major
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
            // console.log("Course not found");
            res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (err) {
        //res.status(400).json({ "message": err.message });
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});