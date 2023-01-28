/**
 * Handles the login and signup API requests.
 */
export default class UserController {
    
    constructor(dao) {
        this.userDao = dao
    }
    
    /**
     * Processes the user's login request.
     */
    async loginUser(req, res, next) {
        try {
            const { email, password } = req.body
            const response = await this.userDao.loginUser(email, password)
            
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

    /**
     * Creates a new user in the database.
     */
    async signupUser(req, res, next) {
        try {
            const { email, password } = req.body
            const response = await this.userDao.signupUser(email, password)
            
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