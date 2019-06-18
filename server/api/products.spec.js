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
    const nameTest = 'English Breakfast'
    const typeTest = 'Black Tea'
    const priceTest = 5000
    const descriptionTest =
      "There are many versions of English Breakfast tea. Ours has an ancient pedigree. Researchers have traced its heritage back to the black tea the English drank regularly in the 1800's. It is, simply, China Black 100% Keemun. A simple way to start your hectic day! "
    const image =
      'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_English_Breakfast_800x.jpg?v=1554494277'

    beforeEach(() => {
      return Product.create({
        name: nameTest,
        type: typeTest,
        price: priceTest,
        description: descriptionTest,
        imageUrl: image
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

    it('GET /api/products - confirm product DESCRIPTION exists', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal(descriptionTest)
    })

    it('GET /api/products - confirm product IMAGEURL exists', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].imageUrl).to.be.equal(image)
    })
  }) // end describe('/api/products')
}) // end describe('Products routes')
