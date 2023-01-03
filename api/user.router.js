import express from 'express'
import UserController from './controllers/user.js'

const userRouter = express.Router()

// login
userRouter.post('/login', UserController.loginUser)

// signup
userRouter.post('/signup', UserController.signupUser)

export default userRouter 