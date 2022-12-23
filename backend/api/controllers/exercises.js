import ExercisesDAO from "../../dao/exercisesDAO.js"

export default class ExercisesController {
    static async apiGetExercises(req, res, next) {
        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }
        const response = await ExercisesDAO.getExercises(filters)

        res.json(response)
    }

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

    static async apiPostExercise(req, res, next) {
        try {
            const name = req.body.name
            const desc = req.body.desc

            const response = await ExercisesDAO.addExercise(name, desc)

            let { error } = response
            if (error) {
                res.status(400).json({ error })
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

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