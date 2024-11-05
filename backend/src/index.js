const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const workspaceRoutes = require('./routes/workspace');
const taskRoutes = require('./routes/task');
require('dotenv').config(); // Add this if not already in your code

const app = express();
const PORT = process.env.PORT || 3000; // Add fallback port

// Middleware
app.use(cors());
// Use express.json() instead of bodyParser (it's deprecated)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/tasks', taskRoutes);

// More specific error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  
  return res.status(err.status || 500).json({
    error: err.message || 'Something went wrong!'
  });
});

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

// Database sync and server start
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });