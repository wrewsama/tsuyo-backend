import Workout from "../models/workouts.js"
import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId

/**
 * This class facilitates access to the data in the Workouts collection.
 * 
 * It supports post, get, and delete operations, as well as getting a single
 * Workout document by its id.
 */
export default class WorkoutsDAO {

    /**
     * Adds a Workout document to the database with a given date.
     * 
     * @param {Date} date The date the Workout was performed on.
     * @returns success and the id of the workout if the Workout is successfully added
     *          error otherwise
     */
    static async addWorkout(date) {
        try {
            const newWorkout = new Workout({
                date: date
            })

            let id
            await newWorkout.save()
                .then(workout => {
                    id = workout._id
                })
            return { status: "success", id: id }
        } catch (e) {
            console.error(`Unable to add workout ${e}`)
            return { error: e }
        }
    }

    /**
     * Gets all the Workouts in the database.
     * 
     * @returns An array containing all the Workout documents in the Workouts
     *          collection.
     *          Error if the command cannot be issued.
     */
    static async getWorkouts() {
        try {
            return await Workout.find({}).sort({date: 'desc'})
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { error: e }
        }
    }

    /**
     * Gets a Workout with a given id.
     * 
     * @param {String} id The id of the desired Workout.
     * @returns The Workout document matching the given id.
     *          error if no such Workout is found.
     */
    static async getWorkoutById(id) {
        try {
            const workout = await Workout.findById(id)
            return workout
        } catch(e) {
            console.error(`Unable to find workout ${e}`)
            return { error: e }
        }
    }

    /**
     * Deletes a Workout from the database.
     * 
     * @param {String} workoutId The id of the workout to be deleted.
     * @returns success if the Workout is successfully deleted
     *          error otherwise
     */
    static async deleteWorkout(workoutId) {
        try {
            await Workout.deleteOne({
                _id: ObjectId(workoutId)
            })
            return { status: "success" }
        } catch (e) {
            console.error(`Unable to delete workout: ${e}`)
            return { error: e }
        }

    }
}