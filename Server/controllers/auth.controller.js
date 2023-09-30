import User from "../models/user.model.js";
import bctyrpt from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = bctyrpt.hashSync(password, 12);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();


        console.log({ username, email });
        res.status(200)
            .json({
                message: "User created"
            })
    } catch (error) {
        // res.status(500)
        //     .json(error.message)

        next(error)

        // next(errorHandler(550 , "Error from signup"))
    }
}

export const signin = async (req, res ,next) => {
    const { email, password } = req.body;
    try {

        const validUser = await User.findOne({ email });
        if (!validUser) {
            throw next(errorHandler(404, "Wrong Cridential/email"))
        }

        const validPassword = bctyrpt.compareSync(password, validUser.password);

        if (!validPassword) {
            throw next(errorHandler(401, 'Wrong Credential/password'))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
       
        const {password:pass, ...rest} = validUser._doc;

        res.cookie('access-token', token,
            {
                httpOnly: true,
                expires: new Date(Date.now() + 1000*60*60*24*3),
            }).status(200).json({
                message: "Valid User",
                user:rest,
            })

    } catch (error) {
        next(error)
    }
}

export const google =async (req,res,next) =>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(user) {
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET);
            const {password:pass , ...rest} = user._doc;
            res.cookie('access-token', token,
            {
                httpOnly: true,
                expires: new Date(Date.now() + 1000*60*60*24*3),
            }).status(200).json({
                message: "Valid User",
                user:rest,
            })
        }else{

            //
            const genaratePassword = Math.random().toString(36).slice(-8) +Math.random().toString(36).slice(-8);
            const hashedPassword = bctyrpt.hashSync(genaratePassword , 12);
           
           //
            const newUser = await User.create({
                username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-6),
                email:req.body.email,
                password:hashedPassword,
                avatar: req.body.avatar
            })
            
            ///jwt token
            const token = jwt.sign({id:newUser._id} , process.env.JWT_SECRET);
            const {password:pass , ...rest} = newUser._doc;
            res.cookie('access-token', token,
            {
                httpOnly: true,
                expires: new Date(Date.now() + 1000*60*60*24*3),
            }).status(200).json({
                message: "Valid User",
                user:rest,
            })
        }
    } catch (error) {
        next(error);
    }
}