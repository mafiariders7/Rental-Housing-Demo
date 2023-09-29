import User from "../models/user.model.js";
import bctyrpt from 'bcryptjs'

export const signup = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = bctyrpt.hashSync(password, 12);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();


        console.log({username,email});
        res.status(200)
            .json({
                message: "User created"
            })
    } catch (error) {
        res.status(500)
            .json(error.message)
    }
}