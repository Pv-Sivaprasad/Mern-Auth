import express from 'express'
import { test } from '../controllers/userController.js'

const user_route = express.Router()

user_route.get('/',test)





export default user_route