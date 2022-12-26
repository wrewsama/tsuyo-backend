import Exercise from "../models/exercises.js"
import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId

/**
 * This class facilitates access to the data in the Exercises collection.
 * 
 * It includes support for CRUD operations as well as finding an Exercise by ID or name.
 */
export default class ExercisesDAO {

    /**
     * Gets the list of Exercises in the database that match the given filters.
     * 
     * @param {Object} filters An object containing filters used to query the database.
     * @returns An object with an array containing the filtered exercises within the
     *          .exercises field.
     */
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

    /**
     * Gets the exercise matching the given ID.
     * 
     * @param {String} id A string representing the id of the desired exercise.
     * @returns The matching exercise.
     */
    static async getExerciseById(id) {
        try {
            const exercise = await Exercise.findById(id)
            return exercise
        } catch(e) {
            console.error(`Unable to find exercise ${e}`)
            return { error: e }
        }
    }

    /**
     * Adds a new Exercise document to the database with the given name
     * and description.
     * 
     * @param {String} name The name of the new Exercise.
     * @param {String} desc The description of the new Exercise/
     * @returns success if the Exercise is successfully added
     *          error otherwise
     */
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

    /**
     * Deletes an Exercise document from the database with the given exerciseId.
     * 
     * @param {String} exerciseId The id of the exercise to be deleted.
     * @returns success if the exercise is successfully deleted
     *          error otherwise.
     */
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

    /**
     * Updates the Exercise document matching the given exerciseId with the
     * given name and desc.
     * 
     * @param {*} exerciseId The id of the exercise to be added.
     * @param {*} name The new name of the exercise.
     * @param {*} desc The new description of the exercise.
     * @returns 
     */
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