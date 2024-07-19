import express from'express'
import {signin,signout,users} from '../controllers/adminController.js'
const admin_route=express.Router()


admin_route.post('/signin',signin)
admin_route.get('/signout',signout)
admin_route.get('/users',users)
admin_route.post('/edit')



export default admin_route