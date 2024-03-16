import { body, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customError.js";
import User from '../models/userModel.js';


const withValidationError = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith("Not authorized")) {
                    throw new UnauthorizedError('Not authorized to access this route');
                }
                throw new BadRequestError(errorMessages[0]);
            }
            next();
        },
    ];
};

export const validateRegisterInput = withValidationError([
    body('username')
    .notEmpty()
    .withMessage('Username is required')
    .custom(async (username) => {
        const user = await User.findOne({ username });
        if (user) {
            throw new BadRequestError('Username already exists. Try another one.');
        }
    }),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage("Invalid email format").
        custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError('email already exists');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
]);


export const validateLoginInput = withValidationError([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail().withMessage("Invalid email format")
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new BadRequestError('User does not exist');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('password is required')
])