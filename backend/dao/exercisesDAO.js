import Exercise from "../models/exercises.js"

const ObjectId = mongodb.ObjectId

export default class ExercisesDAO {

    static async getExercises(filters) {
        let query
        if ("name" in filters) {
            // mongodb atlas text search
            query = { $text: { $search: filters["name"] } }
        }

        try {
            return await Exercise.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { error: e }
        }
    }

    static async addExercise(name, desc) {
        try {
            const newExercise = new Exercise({
                name: name,
                desc: desc
            })

            await newExercise.save()

            return { status: "success" }
        } catch(e) {
            console.error(`Unable to post review ${e}`)
            return { error: e }
        }
    }

    static async deleteExercise(exerciseId) {
        try {
            await Exercise.deleteOne({
                _id: ObjectId(exerciseId)
            })
            return { status: "success" }
        } catch (e) {
            console.error(`Unable to delete exercise: ${e}`)
            return { error: e }
        }
    }

    static async updateExercise(exerciseId, name, desc) {
        try {
            await Exercise.updateOne(
                { _id: ObjectId(exerciseId) },
                {
                    $set: {
                        name: name,
                        desc: desc
                    }
                }
            )
            return { status: "success" }
        } catch (e) {
            console.error(`Unable to update exercise: ${e}`)
            return { error: e }
        }
    }
}