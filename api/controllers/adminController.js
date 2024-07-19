import Admin from '../models/adminModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'
import bcryptjs from "bcryptjs";


// export const signin=async(req,res,next)=>{
  
//     const {email,password}= req.body
//     console.log('inhere',email,password);
    
//     try {
//         console.log('entering try');

//       const validAdmin=await Admin.findOne({email})
//       console.log('the admin details',validAdmin);


//       if(!validAdmin) return next(errorHandler(404,'Admin Details Not Found'))
//         console.log('not valid admin');
    
//         if(password != validAdmin.password)  return next(errorHandler(401,'Invalid Credentials'))
//             console.log('not valild password');
            
//             const token= jwt.sign({id:validAdmin._id},process.env.JWT_SECRET)
//             const {password:password,...rest}=validAdmin._doc
//             console.log('successfull');
//             res
//             .cookie('admin_access_token',token,{httpOnly:true,expires : new Date(Date.now() + 3600000 ) })
//             .status(200)
//             .json(rest)  


//     } catch (error) {
//         next(error)
//     }
// }

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    console.log(`Email: ${email}, Password: ${password}`)

    try {
        const validAdmin = await Admin.findOne({ email })
        console.log(`Found Admin: ${validAdmin}`)

        if (!validAdmin) {
            console.log('Admin Details Not Found')
            return next(errorHandler(404, 'Admin Details Not Found'))
        }

        console.log(`Type of input password: ${typeof password}`)
        console.log(`Type of stored password: ${typeof validAdmin.password}`)
        console.log(`Trimmed input password: ${password.trim()}`)
        console.log(`Trimmed stored password: ${validAdmin.password.trim()}`)

        if (password.trim() !== validAdmin.password.trim()) {
            console.log('Invalid Credentials')
            return next(errorHandler(401, 'Invalid Credentials'))
        }

        const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        const { password: _, ...rest } = validAdmin._doc
        console.log('Login successful')

        res.cookie('admin_access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3600000) // 1 hour
        })
        .status(200)
        .json(rest)

    } catch (error) {
        next(error)
    }
}


export const signout=async(req,res,next)=>{
    res.clearCookie('admin_access_token').status(200).json('Signout success')
}


export const users=async(req,res,next)=>{
    try {
        const users=await User.find().sort({_id:-1})
        if(users){
            res.status(200).json(users)
        }
    } catch (error) {
        console.log("This is the error while fetching whole users. : ",error)
    }
}