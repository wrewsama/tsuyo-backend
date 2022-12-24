import SetsDAO from '../../dao/setsDAO.js'

/**
 * Handles the API requests to the /sets route.
 */
export default class SetsController {
    /**
     * Adds a set to the database.
     */
    static async apiPostSet(req, res, next) {
        try {
            const wid = req.body.workoutId
            const eid = req.body.exerciseId
            const weight = req.body.weight
            const reps = req.body.reps

            const response = await SetsDAO.addSet(wid, eid, weight, reps)
            
            let { error } = response
            if (error) {
                res.status(400).json({ error })
            }
            
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    /**
     * Gets all the Sets in the database.
     */
    static async apiGetSets(req, res, next) {
        const response = await SetsDAO.getSets()

        res.json(response)
    }

    /**
     * Gets all the Sets in the database matching a given exercise id.
     * 
     * Takes the id from the url's params and sends an array containing
     * all the Sets for that exercise in the response.
     */
    static async apiGetSetsByExerciseId(req, res, next) {
        try {
            let exerciseId = req.params.eid || {}
            let response = await SetsDAO.getSetsByExerciseId(exerciseId)

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
     * Deletes a Set from the database.
     * 
     * Takes the id from the url's query part and deletes the corresponding
     * Set document from the database,
     */
    static async apiDeleteSet(req, res, next) {
        try {
            const setId = req.query.id
            const response = await SetsDAO.deleteSet(setId)

            let { error } = response
            if (error) {
                res.status(400).json({ error })
            }
            
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    /**
     * Updates a Set in the database.
     */
    static async apiUpdateSet(req, res, next) {
        try {
            const setId = req.body.id
            const weight = req.body.weight
            const reps = req.body.reps

            const response = await SetsDAO.updateSet(setId, weight, reps)

            let { error } = response
            if (error) {
                res.status(400).json({ error })
            }
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}