// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.js');
const jobRoutes = require('./routes/jobs.js');
const aiRoutes = require('./routes/ai.js');
const postRoutes = require('./routes/postRoutes.js');

const app = express();

// --- CORS CONFIGURATION ---
const allowedOrigins = [
  'http://localhost:5173',     // Local development
  process.env.FRONTEND_URL     // Deployed frontend URL (no trailing slash)
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

// 1. Apply CORS for every request, before any routes
app.use(cors(corsOptions));
// 2. Explicitly handle all OPTIONS preflight requests
app.options('*', cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- ROUTES --- 
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('RizeOS API is running...');
});

// --- SERVER START ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
