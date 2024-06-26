import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    avatar: String
}, {timestamps: true});


export default mongoose.model("User", userModel);