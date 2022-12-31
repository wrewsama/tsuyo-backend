import User from "../models/user.js"

export default class UserDAO {
    static async loginUser() {
        // TODO
    }

    static async signupUser(email, password) {
        try {
            const user = await User.signup(email, password)

            return { email, user }
        } catch (e) {
            console.error(`Unable to signup: ${e}`)
            return { error: e }
        }
    }
}