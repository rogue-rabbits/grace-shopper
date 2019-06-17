/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const nameTest = 'White Peach'
    const typeTest = 'White Tea'
    const priceTest = '28.0'

    beforeEach(() => {
      return Product.create({
        name: nameTest,
        type: typeTest,
        price: priceTest
      })
    })

    it('GET /api/products - confirm product NAME exists', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(nameTest)
    })

    it('GET /api/products - confirm product TYPE exists', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].type).to.be.equal(typeTest)
    })

    it('GET /api/products - confirm product PRICE exists', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].price).to.be.equal(priceTest)
    })
  }) // end describe('/api/products')
}) // end describe('Products routes')
