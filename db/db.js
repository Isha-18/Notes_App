
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'app_user',
  host: 'localhost',
  database: 'notes_app',
  password: 'your_password',
  port: 5432,
});

// User registration function
async function registerUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
  const values = [username, hashedPassword];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// User authentication function
async function authenticateUser(username, password) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];

  try {
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return user;
      }
    }

    return null; // Authentication failed
  } catch (error) {
    throw error;
  }
}

// Note CRUD functions
// Implement functions for creating, editing, deleting, and retrieving notes
// Example:
async function createNote(userId, title, content) {
  const query = 'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *';
  const values = [userId, title, content];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// Implement updateNote, deleteNote, and getNotes functions similarly

module.exports = {
  registerUser,
  authenticateUser,
  createNote,
  
};
