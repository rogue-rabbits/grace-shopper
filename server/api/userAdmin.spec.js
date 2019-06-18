const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const session = require('supertest-session')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('user has access to /api/users/', () => {
    let authSession = session(app)
    const codysEmail = 'cody@puppybook.com'
    const nameF = 'Cody'
    const nameL = 'Coderson'
    const address1 = '111 Internet St'
    const zip = 12345
    const state = 'NY'
    const admin = 'true'
    const pass = '123'

    beforeEach(async () => {
      await User.create({
        firstName: nameF,
        lastName: nameL,
        address1: address1,
        state: state,
        zipCode: zip,
        email: codysEmail,
        password: pass,
        isAdmin: admin
      })

      await authSession
        .post('/auth/login')
        .send({email: 'cody@puppybook.com', password: '123'})
        .expect(200)
    })

    it('GET /api/users - confirm user email exist', async () => {
      const res = await authSession.get('/api/users').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('GET /api/users - confirm first name exists', async () => {
      const res = await authSession.get('/api/users').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].firstName).to.be.equal(nameF)
    })

    it('GET /api/users - confirm last name exists', async () => {
      const res = await authSession.get('/api/users').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].lastName).to.be.equal(nameL)
    })

    it('GET /api/users - confirm address1 exists', async () => {
      const res = await authSession.get('/api/users').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].address1).to.be.equal(address1)
    })

    it('GET /api/users - confirm state exists', async () => {
      const res = await authSession.get('/api/users').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].state).to.be.equal(state)
    })

    it('GET /api/users - confirm zip exists', async () => {
      const res = await authSession.get('/api/users').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].zipCode).to.be.equal(zip)
    })

    it('GET /api/users - confirm admin status exists', async () => {
      const res = await authSession.get('/api/users').expect(200)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
