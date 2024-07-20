import express from'express'
import {signin,signout,users,deleteUser,editUser} from '../controllers/adminController.js'
import { verifyAdminToken } from '../utils/verifyAdmin.js'
const admin_route=express.Router()


admin_route.post('/signin',signin)
admin_route.get('/signout',signout)
admin_route.get('/users' ,users)
admin_route.delete('/delete/:id',deleteUser)
admin_route.post('/edituser',editUser) 


export default admin_route