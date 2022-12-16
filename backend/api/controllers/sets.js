import SetsDAO from '../../dao/setsDAO.js'

export default class SetsController {
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

    static async apiGetSets(req, res, next) {
        const response = await SetsDAO.getSets()

        res.json(response)
    }

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