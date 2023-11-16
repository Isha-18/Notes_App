const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "18122002",
    database: "nodesql"
});

// Use the cors middleware
app.use(cors());

app.use(express.json());

app.post('/create', (req, res) => {
    const { data } = req.body;

    const query = 'INSERT INTO student(id, name, phone) VALUES(Default, $2::text, $3::integer)';
    const values = [data.value1, data.value2, data.value3];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error inserting data');
        } else {
            console.log('Data sent');
            res.send('Data inserted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
