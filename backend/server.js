import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import cors from 'cors';

const app = express();

async function main() {
    await mongoose.connect("mongodb+srv://Math-Electives:MATH1141@cluster0.9afqhh4.mongodb.net/?retryWrites=true&w=majority");
}
main().catch((err) => {console.log(err)});
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log('Connected to database'));


app.use(cors({
    origin: 'http://localhost:3000'
}))


app.get('/', (req, res) => {
    console.log('Inside GET endpoint');
    res.status(200).json({msg: "Inside GET request"});
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
        const userTaken = await User.findOne({username: req.body.username});

        if (user.firstName.length < 1) {
            res.status(400).json({message: "Please fill out your first name"});
        }

        if (user.lastName.length < 1) {
            res.status(400).json({message: "Please fill out your last name"});
        }

        if (user.username.length > 20) {
            res.status(400).json({message: "Username too long"});
        } else if (user.username.length < 1) {
            res.status(400).json({message: "Username too short"});
        } else if (user.password.length > 20) {
            res.status(400).json({message: "Password too long"});
        } else if (user.password.length < 1) {
            res.status(400).json({message: "Password too short"});
        } 
        else if (userTaken) {
            res.status(404).json({message: "Username taken"});
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
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(404).json({message: "User not found"});
        } else if (user.password !== req.body.password) {
            res.status(403).json({message: "Incorrect password"})
        } else {
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})



app.listen(8000, () => console.log('server is running on port 8000'));



