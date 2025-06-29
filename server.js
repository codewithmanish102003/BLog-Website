const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || './blog.db';

// Database setup
const db = new sqlite3.Database(DB_PATH);

// Create posts table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
// Home page - display all posts
app.get('/', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', (err, posts) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.render('index', { posts });
  });
});

// New post form
app.get('/new', (req, res) => {
  res.render('new');
});

// Create new post
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).send('All fields are required');
  }

  db.run('INSERT INTO posts (title, content, author) VALUES (?, ?, ?)', 
    [title, content, author], 
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Database error');
      }
      res.redirect('/');
    }
  );
});

// View single post
app.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  
  db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    
    if (!post) {
      return res.status(404).send('Post not found');
    }
    
    res.render('post', { post });
  });
});

// All Posts page with delete functionality
app.get('/all-posts', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', (err, posts) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.render('all-posts', { posts });
  });
});

// Delete post
app.post('/post/:id/delete', (req, res) => {
  const postId = req.params.id;
  
  db.run('DELETE FROM posts WHERE id = ?', [postId], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.redirect('/all-posts');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Blog server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
