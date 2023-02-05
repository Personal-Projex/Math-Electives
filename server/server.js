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
    //origin: 'http://localhost:3000'
    //origin: 'https://technotes-ndd9.onrender.com/'
    origin: 'https://math-electives-api.onrender.com'
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
            username: username,
            addName: req.body.addName,
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
            res.status(400).send({ message: "Title is too long" });
        } else if (review.termTaken.length < 1) {
            res.status(400).send({ message: "Please fill out term taken" });
        } else if (!review.termTaken.match(/^([2]{1}[0-3]{1}[Tt]{1}[1-3]{1}$)/)) {
            res.status(400).send({ message: "Check term taken format" });
        } else if (review.reviewEnjoyment === 0 && review.reviewManageability === 0 && review.reviewUsefulness === 0) {
            res.status(400).send({ message: "Please fill out the star ratings" });
        } else {
            const courseObj = await Course.findOne({ 'courseObj.courseCode': courseCode });
            let reviewsArr = courseObj.reviews;

            // error checking to see if the user has already posted a review for this course
            const userRev = reviewsArr.find(rev => rev.username === username);
            if (userRev) {
                res.status(405).send({ message: "Your review already exists!" });
            } else {
                let ratings = courseObj.ratings;
                await Course.findOneAndUpdate({ 'courseObj.courseCode': courseCode }, {
                    $push: {
                        reviews: review
                    },
                    'ratings.overall': ((ratings.overall * reviewsArr.length) + overallData) / (reviewsArr.length + 1),
                    'ratings.enjoyment': ((ratings.enjoyment * reviewsArr.length) + review.reviewEnjoyment) / (reviewsArr.length + 1),
                    'ratings.usefulness': ((ratings.usefulness * reviewsArr.length) + review.reviewUsefulness) / (reviewsArr.length + 1),
                    'ratings.manageability': ((ratings.manageability * reviewsArr.length) + review.reviewManageability) / (reviewsArr.length + 1)
                })
                res.sendStatus(200);
            }
        }
    } catch (err) {
    }
})

app.post('/editReview', async (req, res) => {
    try {
        const token = sessionStorage.getItem('token');
        const username = sessionStorage.getItem('username');
        const { reviewId, reviewTitle, reviewText, termTaken, reviewEnjoyment, reviewUsefulness, reviewManageability } = req.body;
        let overallRating = ((reviewManageability + reviewUsefulness + reviewEnjoyment) / 3);

        const courseObj = await Course.findOne({ reviews: { $elemMatch: { _id: reviewId } } });
        let ratings = courseObj.ratings;
        let reviewsArr = courseObj.reviews;
        

        // error checking:
        if (token === null || token === '') {
            res.status(400).send({ message: "Please login before reviewing" });
        } else if (!jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
            res.status(400).send({ message: "Please login before reviewing" });
        }
        else if (reviewTitle.length < 1) {
            res.status(400).send({ message: "Please fill out the review title" });
        } else if (reviewTitle.length >= 60) {
            res.status(400).send({ message: "Title is too long" });
        } else if (termTaken.length < 1) {
            res.status(400).send({ message: "Please fill out term taken" });
        } else if (!termTaken.match(/^([2]{1}[0-3]{1}[Tt]{1}[1-3]{1}$)/)) {
            res.status(400).send({ message: "Check term taken format" });
        } else if (reviewEnjoyment === 0 && reviewManageability === 0 && reviewUsefulness === 0) {
            res.status(400).send({ message: "Please fill out the star ratings" });
        } else {
            let [userRev] = reviewsArr.filter(review => review.username === username);

            await Course.findOneAndUpdate({ reviews: { $elemMatch: { _id: reviewId } } }, {
                $set: {
                    'reviews.$.reviewTitle': reviewTitle,
                    'reviews.$.reviewText': reviewText,
                    'reviews.$.termTaken': termTaken,
                    'reviews.$.reviewEnjoyment': reviewEnjoyment,
                    'reviews.$.reviewUsefulness': reviewUsefulness,
                    'reviews.$.reviewManageability': reviewManageability,
                    'reviews.$.reviewDate': (new Date()).toLocaleDateString('en-AU'),
                },
                'ratings.overall': ((ratings.overall * reviewsArr.length) - userRev.reviewOverall + overallRating) / (reviewsArr.length),
                'ratings.enjoyment': ((ratings.enjoyment * reviewsArr.length) - userRev.reviewEnjoyment + reviewEnjoyment) / (reviewsArr.length),
                'ratings.usefulness': ((ratings.usefulness * reviewsArr.length) - userRev.reviewUsefulness + reviewUsefulness) / (reviewsArr.length),
                'ratings.manageability': ((ratings.manageability * reviewsArr.length) - userRev.reviewManageability + reviewManageability) / (reviewsArr.length)
            })
        }
        res.sendStatus(200);
    } catch (err) {
    }
})

app.post('/deleteReview', async (req, res) => {
    try {
        const { reviewObj } = req.body;

        let reviewId = mongoose.Types.ObjectId((reviewObj._id).trim());

        const courseObj = await Course.findOne({ reviews: { $elemMatch: { _id: reviewId } } });
        let ratings = courseObj.ratings;
        let reviewsArr = courseObj.reviews;
        let overall = 0;
        let enjoyment = 0
        let usefulness = 0;
        let manageability = 0;

        let overallRating = ((reviewObj.reviewManageability + reviewObj.reviewUsefulness + reviewObj.reviewEnjoyment) / 3);

        if (reviewsArr.length > 1) {
            overall = ((ratings.overall * reviewsArr.length) - overallRating) / (reviewsArr.length - 1);
            enjoyment = ((ratings.enjoyment * reviewsArr.length) - reviewObj.reviewEnjoyment) / (reviewsArr.length - 1);
            usefulness = ((ratings.usefulness * reviewsArr.length) - reviewObj.reviewUsefulness) / (reviewsArr.length - 1);
            manageability = ((ratings.manageability * reviewsArr.length) - reviewObj.reviewManageability) / (reviewsArr.length - 1);
        }

        await Course.findOneAndUpdate({ reviews: { $elemMatch: { _id: reviewId } } }, {
            $pull: {
                reviews: { _id: reviewId }
            },
            'ratings.overall': overall,
            'ratings.enjoyment': enjoyment,
            'ratings.usefulness': usefulness,
            'ratings.manageability': manageability
        })

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(400).json({ "message": "Could not delete review" });
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
    }
})

app.get('/getReviewByUser', async (req, res) => {
    try {
        const courseCode = req.query.courseCode;
        const username = req.query.username;

        const course = await Course.findOne({ 'courseObj.courseCode': courseCode });
        if (!course) {
            res.status(404).json({ message: "Course not found" });
        }

        let reviewsArr = course.reviews;
        if (username) {
            // error checking to see if the user has already posted a review for this course
            const userRev = reviewsArr.find(rev => rev.username === username);
            res.status(200).send({
                "userReview": userRev
            });
        } else {
            // user hasnt logged in yet. Don't need to worry about having to edit their review
            res.status(200).send({ "message": "Not logged in" });
        }
    } catch (err) {
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
            res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (err) {
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});