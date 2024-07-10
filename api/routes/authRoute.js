import express from 'express'
import { signup , signin} from '../controllers/authController.js'


const auth_route=express.Router()

auth_route.post('/sign-up',signup)
auth_route.post('/sign-in',signin)


export default auth_route