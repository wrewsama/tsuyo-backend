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
    UserController.init(userDao)
    
    // login
    userRouter.post('/login', UserController.loginUser)
    
    // signup
    userRouter.post('/signup', UserController.signupUser)
    
    return userRouter 
}
export default makeUserRouter