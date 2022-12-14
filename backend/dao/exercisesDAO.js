
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
}