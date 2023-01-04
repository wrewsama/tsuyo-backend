import jwt from 'jsonwebtoken'
import User from "../models/user.js"

/**
 * Ensures the http requests to the backend are authorised.
 * 
 * Checks the json web token in the request's headers and ensures that
 * the token corresponds to an existing user in the database.
 */
const requireAuth = async (req, res, next) => {
    // get auth token
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        // check if token is valid
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (e) {
        console.error(e)
        res.status(401).json({ error: 'Request not authorised!' })
    }
}

export default requireAuth