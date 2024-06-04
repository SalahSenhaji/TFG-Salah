import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

// Middleware setup
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(8080, () => {
    console.log("Server running on http://localhost:8080/");
});

// MongoDB connection URL
const MONGO_URL = "mongodb+srv://admin:admin@cluster0.51ouwfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB connection setup
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error: Error) => {
    console.error("Error connecting to MongoDB:", error);
});
app.use('/',router());
// MongoDB error handling
mongoose.connection.on('error', (error: Error) => {
    console.error("MongoDB connection error:", error);
});
