import mongoose from "mongoose";
import { GAME_STATUS } from "../utils/contants.js";
const { ObjectId } = mongoose.Schema;

const historySchema = new mongoose.Schema({
    gameStatus: {
        type: String,
        enum: Object.values(GAME_STATUS),
        default: GAME_STATUS.DRAW
    },
    myScore: Number,
    opponentScore: Number,
    opponent: String,
    gameLevel: String,
    createdBy: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: true});

export default mongoose.model("History", historySchema);