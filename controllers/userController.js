import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = user.toJSON();
    res.status(200).json({ user: userWithoutPassword });
}


export const updateUser = async (req, res) => {
    const newUser = { ...req.body };
    delete newUser.password;
    newUser.avatar = req.file?.path;
    await User.findByIdAndUpdate(
        req.user.userId,
        newUser,
        { new: true }
    );

    res.status(200).json({ msg: "update user " });
}