
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let exercises

export default class ExercisesDAO {
    static async injectDB(conn) {
        if (exercises) {
          return
        }
        try {
            exercises = await conn.db(process.env.TSUYO_NS).collection("exercises")
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in exercisesDAO: ${e}`,
          )
        }
    }

    static async getExercises({
        filters = null,
        page = 0,
        exercisesPerPage = 20
    } = {}) {
        let query
        if ("name" in filters) {
            // mongodb atlas text search
            query = { $text: { $search: filters["name"] } }
        }

        let cursor

        try {
            cursor = await exercises.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { exerciseList: [], numExercises: 0 }
        }

        const displayCursor = cursor.limit(exercisesPerPage).skip(exercisesPerPage * page)

        try {
            const exerciseList = await displayCursor.toArray()
            const numExercises = await exercises.countDocuments(query)

            return { exerciseList, numExercises }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents ${e}`)
            return { exerciseList: [], numExercises: 0 }
        }
    }

    static async addExercise(name, desc) {
        try {
            const newDoc = {
                name: name,
                desc: desc
            }

            return await exercises.insertOne(newDoc)
        } catch(e) {
            console.error(`Unable to post review ${e}`)
            return { error: e }
        }
    }

    static async deleteExercise(exerciseId) {
        try {
            const response = await exercises.deleteOne({
                _id: ObjectId(exerciseId)
            })

            return response
        } catch (e) {
            console.error(`Unable to delete exercise: ${e}`)
            return { error: e }
        }
    }

    static async updateExercise(exerciseId, name, desc) {
        try {
            const response = await exercises.updateOne(
                { _id: ObjectId(exerciseId) },
                {
                    $set: {
                        name: name,
                        desc: desc
                    }
                }
            )
            return response
        } catch (e) {
            console.error(`Unable to update exercise: ${e}`)
            return { error: e }
        }
    }
}