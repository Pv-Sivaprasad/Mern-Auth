import Admin from '../models/adminModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'
import bcryptjs from "bcryptjs";




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


export const signout = async (req, res, next) => {
    res.clearCookie('admin_access_token').status(200).json('Signout success')
}


export const users = async (req, res, next) => {
    console.log('reached here');
    try {
        const users = await User.find().sort({ _id: -1 })
        console.log('total', users)
        if (users) {
            res.status(200).json(users)
        }
    } catch (error) {
        console.log("This is the error while fetching whole users. : ", error)
    }
}


export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: req.params.id })
        console.log(deletedUser);
        res.status(200).json('user  has been deleted')
    } catch (error) {
        console.log(error);
    }
}

export const editUser = async (req, res) => {
    try {

        if (req.body.password) {
            req.body.password = await bcryptjs.hash(req.body.password, 10)
        }

        const updateUser=await User.findByIdAndUpdate(req.body.id,{
            $set :{
                username: req.body.userName,
                email: req.body.email,
                password: req.body.password,
            }
        },
        {new : true}
    );

    const {password,...rest}=updateUser._doc;
    res.status(200).json(rest)


    } catch (error) {
        next(error)
    }
}