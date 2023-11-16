const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const app = express();


const db = pgp({
    user: 'my_user',
    password: 'your_password',
    host: 'localhost',
    port: 5432,
    database: 'userss',
});


app.use(bodyParser.json());

// Your routes will go here
const users = [];
let currentUser = null;

// Registration endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.json({ message: 'Registration successful' });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Logout endpoint
app.post('/logout', (req, res) => {
    currentUser = null;
    res.json({ message: 'Logout successful' });
});


app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000}`);
});
