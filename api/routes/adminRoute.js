import express from'express'
import {signin} from '../controllers/adminController.js'
const admin_route=express.Router()


admin_route.post('/signin',signin)




export default admin_route