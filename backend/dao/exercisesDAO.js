import Exercise from "../models/exercises.js"
import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId

export default class ExercisesDAO {

    static async getExercises(filters) {
        let query
        if ("name" in filters) {
            // mongodb atlas text search
            query = { $text: { $search: filters["name"] } }
        }

        try {
            const exercises = await Exercise.find(query)
            return { exercises: exercises }
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { exercises: [] }
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
            console.error(`Unable to add exercise ${e}`)
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