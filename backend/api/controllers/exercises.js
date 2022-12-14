import ExercisesDAO from "../../dao/exercisesDAO.js"

export default class ExercisesController {
    static async apiGetExercises(req, res, next) {
        const exercisesPerPage = req.query.exercisesPerPage ? parseInt(req.query.exercisesPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }

        const {exerciseList, numExercises} = await ExercisesDAO.getExercises({
            filters,
            page,
            exercisesPerPage
        })

        let response = {
            exercises: exerciseList,
            page: page,
            filters: filters,
            entries_per_page: exercisesPerPage,
            total_results: numExercises
        }

        res.json(response)
    }

    static async apiPostExercise(req, res, next) {
        try {
            const name = req.body.name
            const desc = req.body.desc

            const response = await ExercisesDAO.addExercise(name, desc)
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