import express from 'express'
import { signup } from '../controllers/authController.js'


const auth_route=express.Router()

auth_route.post('/sign-up',signup)


export default auth_route