import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

const MONGO_URI = process.env.MONGO_URI;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "views")));

const user = {
    username: 'user',
    password: '12345678',
}


app.post('/login', (req, res) => {

    const { username, password } = req.body;
    try {
        if (username === user.username && password === user.password) {
            res.cookie('username', username, {
                maxAge: 60000,
                httpOnly: true,
            })
            return res.status(201).json({
                message: "Login successful"
            })
        } else {
            res.status(401).json({
                message: "Username or password is incorrect"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }

})


app.get('/dashboard', (req, res) => {
    const username = req.cookies.username;
    if (!username) {
        res.status(400).json({
            message: "Not authorized"
        })
        return;
    }
    res.status(200).json({
        message: "Username fetched successfully",
        username: username
    })
})

app.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.status(200).json({
        message: "Cookie cleared and logged out"
    })
})

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`)
})