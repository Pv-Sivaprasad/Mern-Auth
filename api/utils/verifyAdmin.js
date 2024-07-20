import jwt from 'jsonwebtoken'
import {errorHandler} from './error.js'

export const verifyAdminToken=(req,res,next)=>{
    const token=req.cookies.admin_access_token

    if(!token) return next(errorHandler(401,'You are not authenticated'))

        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err) return next(errorHandler(403, 'Token is not valid!'));
    
            req.admin=admin;
            
            next()
        })
    
}