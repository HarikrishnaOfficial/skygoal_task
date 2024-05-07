const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(cors({
    "origin":"*"
}))

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/skygoal')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Routes
app.use('/', userRoutes);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
