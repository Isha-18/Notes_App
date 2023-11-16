const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

module.exports = (pool) => {
  router.post('/index', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/index', async (req, res) => {
    const { username, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

      if (result.rows.length > 0) {
        const match = await bcrypt.compare(password, result.rows[0].password);

        if (match) {
          req.session.userId = result.rows[0].id;
          res.json({ message: 'Login successful' });
        } else {
          res.status(401).send('Invalid credentials');
        }
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
