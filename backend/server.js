


// C:\blogging-platform\backend\server.js




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI
const URI = 'mongodb+srv://kankalasrikanth1:QqUP8M61fJDuv1Ya@cluster0.f0o7t.mongodb.net/Blog_posts?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Root route handler
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API!');
});

// Routes
app.use('/api/posts', postRoutes); // Ensure this route is correctly defined

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
