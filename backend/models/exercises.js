import mongoose from "mongoose"

/**
 * This object defines the schema for an Exercise.
 */
const schema = new mongoose.Schema({
    name: String,
    desc: String
})

const model = mongoose.model("Exercise",
                             schema,
                             "exercises")

export default model