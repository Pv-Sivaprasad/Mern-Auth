import express from 'express'
import { signup,signin } from '../controllers/authController.js'

const user_route = express.Router()

user_route.get('/signup',signup)
user_route.post('/signin',signin)
user_route.post('/google',)




export default user_route