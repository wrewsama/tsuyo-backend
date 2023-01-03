import ExercisesDAO from "../../dao/exercisesDAO.js"

/**
 * Handles the API requests to the /exercises route.
 */
export default class ExercisesController {
    /**
     * Gets all the Exercises in the database.
     */
    static async apiGetExercises(req, res, next) {
        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }
        const userId = req.user._id
        filters.userId = userId
        
        const response = await ExercisesDAO.getExercises(filters)

        res.json(response)
    }

    /**
     * Gets the Exercise matching the id given in the url params.
     */
    static async apiGetExerciseById(req, res, next) {
        try {
            let id = req.params.id || {}
            let exercise = await ExercisesDAO.getExerciseById(id)

            if (!exercise) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(exercise)
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    /**
     * Adds a new Exercise to the database.
     */
    static async apiPostExercise(req, res, next) {
        try {
            const name = req.body.name
            const desc = req.body.desc
            const userId = req.user._id

            const response = await ExercisesDAO.addExercise(name, desc, userId)

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
     * Deletes an Exercise from the database.
     * 
     * Gets the exercise's id from the query part of the url, then deletes
     * that document from the database.
     */
    static async apiDeleteExercise(req, res, next) {
        try {
            const exerciseId = req.query.id
            console.log(exerciseId)
            const response = await ExercisesDAO.deleteExercise(exerciseId)

            let { error } = response
            if (error) {
                res.status(400).json({ error })
            }
            
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    /**
     * Updates an Exercise in the database.
     */
    static async apiUpdateExercise(req, res, next) {
        try {
            const exerciseId = req.body.id
            const name = req.body.name
            const desc = req.body.desc

            const response = await ExercisesDAO.updateExercise(exerciseId, name, desc)

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