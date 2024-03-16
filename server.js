import "express-async-errors";
import express from "express";
import * as dotenv from 'dotenv';
dotenv.config();
import morgan from "morgan";
import mongoose from "mongoose";

// INITIALIZING APP
const app = express();


// ROUTES
import authRoutes from "./routes/authRoutes.js";


// MIDDLEWARE
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

if (process.env.NODE_ENV === 'developemnt') {
    app.use(morgan("dev"));
}


app.use(express.json());


// USING ROUTES
app.use("/api/auth", authRoutes);


app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);


// STARTING SERVER
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log("Server running : ", PORT);
        });
    })
    .catch((error) => {
        console.log("Error during database connection");
    })