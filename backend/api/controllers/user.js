import UserDAO from "../../dao/userDAO.js"

export default class UserController {
    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body
            const response = await UserDAO.loginUser(email, password)
            
            let { error } = response
            if (error) {
                res.status(400).json({ error })
                return
            }

            res.json(response)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async signupUser(req, res, next) {
        try {
            const { email, password } = req.body
            const response = await UserDAO.signupUser(email, password)
            
            let { error } = response
            if (error) {
                res.status(400).json({ error })
                return
            }

            res.json(response)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
        
    }
}