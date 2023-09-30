import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcryptjs'

export const testHandler = (req, res) => {
    res.json({
        message: "this is test route for user"
    })
}

export const updateUser = async (req, res, next) => {
    try {
        if (req.params.id !== req.user.id) return next(errorHandler(401, 'Unauthorized'))
        if (req.body?.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 12);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true })
        const { password: pass, ...rest } = updatedUser._doc;
        res.status(200).json({
            message: "user updated",
            user: rest
        });
    } catch (error) {
        next(error)
    }
}