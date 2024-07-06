import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongodb');
}).catch((err)=>{
    console.log('some error during connecting to mongodb',err);
})

const app= express()
const port=7000;





app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})