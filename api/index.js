import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
dotenv.config()


mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongodb');
}).catch((err)=>{
    console.log('some error during connecting to mongodb');
    console.log(err);
})

const app= express()
const port=7000;
app.use(express.json())





app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})


app.use('/',userRoute)
app.use('/auth',authRoute)




app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal server Error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    });
});
