const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth.js');
const jobRoutes = require('./routes/jobs.js');
const aiRoutes = require('./routes/ai.js');
const postRoutes = require('./routes/postRoutes.js');

const app = express();

// --- FINAL CORS CONFIGURATION ---
const allowedOrigins = [
    'http://localhost:5173',      // For your local development
    process.env.FRONTEND_URL      // For your live deployed frontend
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests if their origin is in our trusted list
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // Block requests from any other origin
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// --- DATABASE & ROUTES ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

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
    console.log(`Server is running on http://localhost:${PORT}`);
});
