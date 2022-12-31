import mongoose from "mongoose"
import bcrypt from "bcrypt"

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

schema.statics.signup = async function (email, password) {
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Email already in use!")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

const model = mongoose.model("User",
                             schema,
                             "users")

export default model