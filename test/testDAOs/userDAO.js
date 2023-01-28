import jwt from "jsonwebtoken"
import { jest } from '@jest/globals'

/**
 * This class facilitates access to the users database.
 */
export default class UserDAO {

    /**
     * Creates a json web token based on a given user's id.
     * 
     * @param {String} _id The id of the user.
     * @returns A json web token for the user.
     */
    static createToken(_id) {
        return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
    }

    /**
     * Attempts to log a user in.
     * 
     * @param {String} email The email input. 
     * @param {String} password The password input.
     * @returns Object containing the user's email and jwt if sucessful.
     *          error message otherwise.
     */
    static loginUser = jest.fn()

    /**
     * Adds a user to the database.
     * 
     * @param {String} email The email of the user.
     * @param {String} password The password of the user.
     * @returns Object containing the user's email and jwt if sucessful.
     *          error message otherwise.
     */
    static signupUser = jest.fn()
}