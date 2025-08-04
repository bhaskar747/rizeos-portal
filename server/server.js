const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const aiRoutes = require('./routes/aiRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// --- START OF THE CORS CONFIGURATION ---

// Define the list of trusted origins (URLs)
const allowedOrigins = [
    'http://localhost:5173',      // For local development
    process.env.FRONTEND_URL      // For your live deployed frontend
];

// Configure CORS with specific options
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
};

// Use the configured CORS options
app.use(cors(corsOptions));

// --- END OF THE CORS CONFIGURATION ---

// Middleware to parse JSON bodies
app.use(express.json());

// --- START OF RESTORED DATABASE & ROUTES ---

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/posts', postRoutes);

// Root endpoint for health check
app.get('/', (req, res) => {
    res.send('RizeOS API is running...');
});

// --- END OF RESTORED DATABASE & ROUTES ---

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
