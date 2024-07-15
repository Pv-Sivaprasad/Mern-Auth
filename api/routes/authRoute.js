import express from 'express'
import { signup , signin,google} from '../controllers/authController.js'


const auth_route=express.Router()

auth_route.post('/sign-up',signup)
auth_route.post('/sign-in',signin)
auth_route.post('/google',google)

export default auth_route