const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  router.get('/index', async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const result = await pool.query('SELECT * FROM notes WHERE user_id = $1', [userId]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error during notes viewing:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
