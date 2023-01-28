import request from 'supertest'
import app from "../server.js"

describe("Sign Up", () => {
    test("Should respond with status code 200", async () => {
        const response = await request(app).post('/api/v1/user/signup/').send({
            email: "a@a.com",
            password: "a"
        })
        expect(response.statusCode).toBe(200)
    })
})