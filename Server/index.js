import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js"

const app = express();

dotenv.config()
app.use(express.json());


app.use("/api/user" ,userRouter);

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