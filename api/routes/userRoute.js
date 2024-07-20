import express from 'express'
import { signup,signin } from '../controllers/authController.js'
import {updateUser,deleteUser, checkUser} from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyUser.js';

const user_route = express.Router()





user_route.post('/update/:id',verifyToken,updateUser)
user_route.delete('/delete/:id',verifyToken,deleteUser)
user_route.get('/checkuser',verifyToken,checkUser)




export default user_route