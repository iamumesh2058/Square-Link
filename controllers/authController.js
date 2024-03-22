import User from '../models/userModel.js';
import { comparePassword, hashedPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customError.js';
import { createJWT } from '../utils/tokenUtils.js';


export const register = async (req, res) => {
    const hashedPasswords = await hashedPassword(req.body.password);
    req.body.password = hashedPasswords;
    const user = await User.create(req.body);
    res.status(201).json({ msg: "User created" });
}

export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    const isValidUser = user && (await comparePassword(req.body.password, user.password));

    if (!isValidUser) throw new UnauthenticatedError("Invalid credentials");

    const token = createJWT({ userId: user._id });

    const oneDay = 1000 * 60 * 60 * 25;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({ msg: "User logged in" });
}

export const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.send("logout");
}