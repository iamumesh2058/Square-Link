import History from "../models/historyModel.js";
import mongoose from "mongoose";
import day from "dayjs";

export const createHistory = async (req, res) => {
    req.body.createdBy = req.user.userId;
    let history = await History.create(req.body);
    res.status(201).json({ history });
}

export const getAllHistory = async (req, res) => {
    const history = await History.find({ createdBy: req.user.userId }).sort("-createdAt");
    res.status(200).json({ history });
}

// show stats
export const showStats = async (req, res) => {
    let stats = await History.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$gameStatus', count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc
    }, {});

    const defaultStats = {
        Win: stats.Win || 0,
        Draw: stats.Draw || 0,
        Lose: stats.Lose || 0
    }

    let weeklyGames = await History.aggregate([
        { $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: { 
                    year: { $year: '$createdAt' }, 
                    month: { $month: '$createdAt' },
                    dayofMonth: { $dayOfMonth: "$createdAt"}
                },
                count: { $sum: 1 }
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
        { $limit: 7 }
    ]);

    weeklyGames = weeklyGames.map((game) => {
        const { _id: {year, month, dayofMonth}, count } = game;
        const date = day().year(year).month(month-1).date(dayofMonth).format("DD MMM YY")
        return { date, count }
    }).reverse();

    res.status(200).json({ defaultStats, weeklyGames });
}