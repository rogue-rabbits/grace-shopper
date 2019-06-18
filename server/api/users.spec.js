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

  describe('non admin denied access to to /api/users/', () => {
    const Email = 'murphy@email.com'
    const nameF = 'Murphy'
    const nameL = 'Murpherson'
    const address1 = '789 Web Dr'
    const zip = 56789
    const state = 'NY'
    const admin = 'false'

    beforeEach(() => {
      return User.create({
        email: Email,
        firstName: nameF,
        lastName: nameL,
        address1: address1,
        state: state,
        zipCode: zip,
        isAdmin: admin
      })
    })

    it('GET /api/users - not allowed access to users data', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(401)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
