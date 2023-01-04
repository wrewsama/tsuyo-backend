import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

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

/**
 * Signs a new user up.
 * 
 * Performs input validation, encrypts the password, then saves the document
 * to the users database.
 * 
 * @param {String} email user's email
 * @param {String} password user's password
 * @returns The saved user document.
 */
schema.statics.signup = async function (email, password) {
    // validation
    if (!email || !password) {
        throw Error("All fields must be filled!")
    }
    
    if (!validator.isEmail(email)) {
        throw Error("Invalid email!")
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Email already in use!")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

/**
 * Attempts to log a user in.
 * 
 * Performs input validation, then checks if the email and password matches
 * a user in the database.
 * 
 * @param {String} email user's email
 * @param {String} password user's password
 * @returns The user document.
 */
schema.statics.login = async function(email, password) {
    // validation
    if (!email || !password) {
        throw Error("All fields must be filled!")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Incorrect login credentials")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect login credentials")
    }

    return user
}

const model = mongoose.model("User",
                             schema,
                             "users")

export default model