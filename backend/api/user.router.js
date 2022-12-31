import express from 'express'
import UserController from './controllers/user'

const userRouter = express.Router()

// login
router.post('/login', UserController.loginUser)

// signup
router.post('/signup', UserController.signupUser)

export default userRouter 