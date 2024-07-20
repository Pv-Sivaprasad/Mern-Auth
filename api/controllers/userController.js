import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'


//updating the user

export const updateUser=async(req,res,next)=>{


if(req.user.id !== req.params.id) return next(errorHandler(401,'You can update your account from here'))

        try {
                if(req.body.password){
                    req.body.password= bcryptjs.hashSync(req.body.password,10)
                }

                const updatedUser= await User.findByIdAndUpdate(
                    req.params.id,{
                        $set:{
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            profilePicture: req.body.profilePicture,
                          },
                        },
                        { new: true }
                      )

                      const { password, ...rest } = updatedUser._doc;
                      res.status(200).json(rest);

        } catch (error) {
            next(error)
        }
}


//delete user 

  export const  deleteUser= async(req,res,next)=>{

   if(req.user.id !== req.params.id) 
    {
        return next(errorHandler(401,'You can delete your account from here'))
    }

    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User Account has been deleted successfully...')
    } catch (error) {
        next(error)
    }

  }

export const checkUser=async(req,res,next)=>{
    const id=req.user;
    try {
        const valideUser=await User.findById(id)
        if(valideUser){
            res.status(200).json({status:true,message:'User valid'})
        }else{
            res.status(404).json({status:false,message:'user not found'})
        }
    } catch (error) {
        res.status(500).json({staus:false,message:"Server error",error})
    }
}