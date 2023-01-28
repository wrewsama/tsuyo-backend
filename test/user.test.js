import request from 'supertest'
import makeApp from "../server.js"
import mainDAO from './testDAOs/mainDAO.js'

const app = makeApp(mainDAO)

describe("Sign Up", () => {

    beforeEach(() => {
        mainDAO.usersDao.signupUser.mockReset()
    })
    test("Should call the signup function once", async () => {
        const response = await request(app).post('/api/v1/user/signup/').send({
            email: "b@a.com",
            password: "a"
        })
        expect(mainDAO.usersDao.signupUser.mock.calls.length).toBe(1)
    })

    test("Should correctly take in the given email and password", async () => {
        const response = await request(app).post('/api/v1/user/signup/').send({
            email: "b@a.com",
            password: "a"
        })
        expect(mainDAO.usersDao.signupUser.mock.calls[0][0]).toBe("b@a.com")
        expect(mainDAO.usersDao.signupUser.mock.calls[0][1]).toBe("a")
    })

    test("Should respond with json object containing email", async () => {
        mainDAO.usersDao.signupUser.mockResolvedValue({
            email: "b@a.com"
        })
        const response = await request(app).post('/api/v1/user/signup/').send({
            email: "b@a.com",
            password: "a"
        })
        expect(response.body.email).toBe("b@a.com")
    })

    test("Should respond with a 200 status code", async () => {
        mainDAO.usersDao.signupUser.mockResolvedValue({
            email: "a"
        })
        const response = await request(app).post('/api/v1/user/signup/').send({
            email: "b@a.com",
            password: "a"
        })
        expect(response.statusCode).toBe(200)
    })
})

describe("Log In", () => {
    beforeEach(() => {
        mainDAO.usersDao.loginUser.mockReset()
    })
    test("Should call the login function once", async () => {
        const response = await request(app).post('/api/v1/user/login/').send({
            email: "b@a.com",
            password: "a"
        })
        expect(mainDAO.usersDao.loginUser.mock.calls.length).toBe(1)
    })

    test("Should correctly take in the given email and password", async () => {
        const response = await request(app).post('/api/v1/user/login/').send({
            email: "b@a.com",
            password: "a"
        })
        expect(mainDAO.usersDao.loginUser.mock.calls[0][0]).toBe("b@a.com")
        expect(mainDAO.usersDao.loginUser.mock.calls[0][1]).toBe("a")
    })

    test("Should respond with json object containing email", async () => {
        mainDAO.usersDao.loginUser.mockResolvedValue({
            email: "b@a.com"
        })
        const response = await request(app).post('/api/v1/user/login/').send({
            email: "b@a.com",
            password: "a"
        })
        expect(response.body.email).toBe("b@a.com")
    })

    test("Should respond with a 200 status code", async () => {
        mainDAO.usersDao.loginUser.mockResolvedValue({
            email: "a"
        })
        const response = await request(app).post('/api/v1/user/login/').send({
            email: "b@a.com",
            password: "a"
        })
        expect(response.statusCode).toBe(200)
    })
})