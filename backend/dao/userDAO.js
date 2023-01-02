import User from "../models/user.js"
import jwt from "jsonwebtoken"

export default class UserDAO {

    static createToken(_id) {
        return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
    }

    static async loginUser(email, password) {
        try {
            const user = await User.login(email, password)
            const token = this.createToken(user._id)

            return { email, token }
        } catch (e) {
            console.error(`Unable to login: ${e}`)
            return { error: e.message }
        }
    }

    static async signupUser(email, password) {
        try {
            const user = await User.signup(email, password)
            const token = this.createToken(user._id)

            return { email, token }
        } catch (e) {
            console.error(`Unable to signup: ${e}`)
            return { error: e.message }
        }
    }
}