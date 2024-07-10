import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance
    const newuser = new User({ username, email, password: hashedPassword });
    try {
        await newuser.save()
        res.status(201).json({ message: 'user created successfully' });
    } catch (error) {
        next(errorHandler(300, "something went Wrong"));
        // next(error)
    }


}


export const signin = async (req, res, next) => {

    const { email, password } = req.body
    try {

        const validUser = await User.findOne({ email })

        if (!validUser) return next(errorHandler(404, 'User Not Found'))

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Invalid Email/Password Entered'))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest } = validUser._doc
        const expiryDate = new Date(Date.now() + 360000)
        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest)

    } catch (error) {
        next(error)
    }

}