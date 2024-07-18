import Admin from '../models/adminModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'
import bcryptjs from "bcryptjs";


export const signin=async(req,res,next)=>{
  
    const {email,password}= req.body
    console.log(email,password);
    try {
        
      const validAdmin=await Admin.findOne({email})
      console.log(validAdmin);
      if(!validAdmin) return next(errorHandler(404,'Admin Details Not Found'))

        if(password != validAdmin.password)  return next(errorHandler(401,'Invalid Credentials'))
            console.log('not valild password');
            const token= jwt.sign({id:validAdmin._id},process.env.JWT_SECRET)
            const {password:password,...rest}=validAdmin._doc
            console.log('successfull');
            res
            .cookie('admin_access_token',token,{httpOnly:true,expires : new Date(Date.now() + 3600000 ) })
            .status(200)
            .json(rest)  


    } catch (error) {
        next(error)
    }
}