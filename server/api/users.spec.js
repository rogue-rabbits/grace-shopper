/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const nameF = 'Cody'
    const nameL = 'Coderson'
    const address1 = '111 Internet St'
    const zip = 12345
    const state = 'NY'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        firstName: nameF,
        lastName: nameL,
        address1: address1,
        state: state,
        zipCode: zip
      })
    })

    it('GET /api/users - confirm user email exists', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('GET /api/users - confirm first name exists', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].firstName).to.be.equal(nameF)
    })

    it('GET /api/users - confirm last name exists', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].lastName).to.be.equal(nameL)
    })

    it('GET /api/users - confirm address1 exists', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].address1).to.be.equal(address1)
    })

    it('GET /api/users - confirm state exists', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].state).to.be.equal(state)
    })

    it('GET /api/users - confirm zip exists', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].zipCode).to.be.equal(zip)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
