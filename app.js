const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('notes_app')); 
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'userss',
  password: 'your_password',
  port: 5432,
});

const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');

app.use('/auth', authRoutes(pool));
app.use('/notes', notesRoutes(pool));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
