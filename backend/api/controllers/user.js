export default class UserController {
    static async loginUser(req, res, next) {
        res.json({ msg: 'login' })
    }

    static async signupUser(req, res, next) {
        res.json({ msg: 'signup' })
    }
}