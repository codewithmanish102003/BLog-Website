# Simple Blog Website

A simple blog web application built with Node.js, Express, SQLite, and EJS.

## Features

- ✅ Create, read, and delete blog posts
- ✅ Responsive design
- ✅ All posts management page
- ✅ Clean and modern UI

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure it:
```bash
cp .env.example .env
```

Edit `.env` file with your settings:
```env
# Database Configuration
DB_PATH=./blog.db

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Start the Server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Security Notes

- ✅ Database file (`blog.db`) is excluded from version control
- ✅ Environment variables are used for configuration
- ✅ `.env` file is excluded from version control

## File Structure

```
├── server.js          # Main server file
├── blog.db           # SQLite database (auto-created)
├── package.json      # Dependencies
├── .env.example      # Environment variables template
├── .gitignore        # Git ignore rules
├── public/           # Static files
│   └── css/
│       └── style.css
└── views/            # EJS templates
    ├── index.ejs     # Home page
    ├── all-posts.ejs # All posts management
    ├── new.ejs       # New post form
    ├── post.ejs      # Individual post view
    └── partials/     # Reusable components
        ├── header.ejs
        └── footer.ejs
```

## Routes

- `GET /` - Home page with recent posts
- `GET /all-posts` - All posts management page
- `GET /new` - Create new post form
- `POST /posts` - Create new post
- `GET /post/:id` - View individual post
- `POST /post/:id/delete` - Delete post

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Template Engine**: EJS
- **Styling**: CSS3
- **Environment**: dotenv 