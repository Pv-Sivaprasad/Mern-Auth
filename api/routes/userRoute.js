import express from 'express'
import { signup,signin } from '../controllers/authController.js'
import {test,updateUser,deleteUser} from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyUser.js';

const user_route = express.Router()


user_route.get('/', test);

user_route.post('/update/:id',verifyToken,updateUser)
user_route.delete('/delete/:id',verifyToken,deleteUser)




export default user_route