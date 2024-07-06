import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'


export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance
    const newuser = new User({ username, email, password: hashedPassword });
    try {
        await newuser.save()
        res.status(201).json({message:'user created successfully'});
    } catch (error) {
        next(errorHandler(300,"something went Wrong"));
        // next(error)
    } 

   
}