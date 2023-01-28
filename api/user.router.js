import express from 'express'
import UserController from './controllers/user.js'

/**
 * Creates a router that defines the API routes used for user auth.
 * 
 * @param {Class} userDao Data Access Object for the Users DB
 * @returns user router
 */
const makeUserRouter = (userDao) => {
    const userRouter = express.Router()

    // initialise controller
    const userController = new UserController(userDao)
    
    // login
    userRouter.post('/login', userController.loginUser)
    
    // signup
    userRouter.post('/signup', userController.signupUser)
    
    return userRouter 
}
export default makeUserRouter