const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig'); // Import Swagger config

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(express.json());
app.use(cors());

// Swagger API documentation route
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/upload', uploadRoutes);

// Connect to MongoDB
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const ENCODED_PASSWORD = encodeURIComponent(MONGO_PASSWORD);
const USERNAME = process.env.MONGO_USERNAME
const MONGO_URI = `mongodb+srv://${USERNAME}:${ENCODED_PASSWORD}@cluster0.mgeor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Start server

// const PORT = process.env.PORT || 8000;
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));