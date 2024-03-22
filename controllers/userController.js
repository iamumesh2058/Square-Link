import User from "../models/userModel.js";
import { formatImage } from "../middleware/multerMiddleware.js";
import cloudinary from 'cloudinary';

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = user.toJSON();
    res.status(200).json({ user: userWithoutPassword });
}


export const updateUser = async (req, res) => {
    // const newUser = { ...req.body };
    // delete newUser.password;
    // newUser.avatar = req.file?.path;
    // await User.findByIdAndUpdate(
    //     req.user.userId,
    //     newUser,
    //     { new: true }
    // );

    // res.status(200).json({ msg: "update user " });
    const newUser = { ...req.body };
    delete newUser.password;

    if (req.file) {
        const file = formatImage(req.file);

        const response = await cloudinary.v2.uploader.upload(file);

        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    res.status(200).json({ msg: "update user " });
}