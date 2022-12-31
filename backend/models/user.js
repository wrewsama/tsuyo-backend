import mongoose from "mongoose"

/**
 * This object defines the schema for an User.
 */
const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const model = mongoose.model("User",
                             schema,
                             "users")

export default model