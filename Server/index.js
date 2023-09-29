import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js"
import authRouter from './routes/auth.route.js'

const app = express();

dotenv.config()
app.use(express.json());


app.use("/api/user" ,userRouter);
app.use('/api/auth' ,authRouter);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDb connected")
    }).catch((err) => {
        console.log(err);
    })

app.listen(4000, () => {
    console.log("server is running on port 4000")
})

app.get('/',(req,res)=>{
   res.json({
    message:"Hello World"
   })
})


//Error Handler
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Interanl Server Error";

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
})