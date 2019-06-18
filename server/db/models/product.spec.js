const {expect} = require('chai')
const db = require('../index')
const Product = require('./product')

describe('Product model', () => {
  //Clear the database and recreate the tables before beginning a run
  beforeEach(() => {
    return db.sync({force: true})
  })

  //create an unsaved instance of Product before every spec
  let product
  let description = 'the most delicious tea in mankind'
  let imageUrl =
    'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_Royal_Wedding_800x.jpg?v=1551284786'
  beforeEach(() => {
    product = Product.build({
      name: 'Matcha',
      type: 'Tea',
      price: 4000,
      quantity: 10,
      description: description,
      imageUrl: imageUrl
    })
  })

  //empty table after each spec
  afterEach(() => {
    Product.truncate({cascade: true})
  })

  describe('attributes definition', () => {
    it('includes name, type, price, quantity, description and imageUrl', async () => {
      const savedProduct = await product.save()
      expect(savedProduct.name).to.equal('Matcha')
      expect(savedProduct.type).to.equal('Tea')
      expect(savedProduct.price).to.equal(4000)
      expect(savedProduct.quantity).to.equal(10)
      expect(savedProduct.description).to.equal(description)
      expect(savedProduct.imageUrl).to.equal(imageUrl)
    })

    it('requires name', async () => {
      product.name = null

      let result
      let error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires type', async () => {
      product.type = null

      let result
      let error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires price', async () => {
      product.price = null

      let result
      let error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires quantity', async () => {
      product.quantity = null

      let result
      let error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires description', async () => {
      product.description = null

      let result
      let error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when content is null')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('description can handle long content', async () => {
      let newDescription =
        'Powdered green teas have been consumed in China and Japan for centuries. However it is only in the last few decades that Westerners have acquired a taste for this ancient tea. We enjoy the bracing vegetal flavors, as well as the unusual process for preparing the tea. We offer a range of thin, thick and extra thick Matcha grades depending upon your taste and purpose, as well as accessories youll need for preparation and serving. Be sure to check out our tea collections for more delicious brew options'
      product.description = newDescription
      expect(product.description).to.equal(newDescription)
    })

    it('price has to be an integer type', () => {
      expect(product.price).to.be.a('number')
      expect(product.price % 1).to.equal(0)
    })

    it('if no imageUrl is provided, give it a default', async () => {
      let newProduct = await Product.create({
        name: 'Matcha',
        type: 'Tea',
        price: 4000,
        quantity: 10,
        description: description
      })

      expect(newProduct.imageUrl).to.equal(
        'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_Royal_Wedding_800x.jpg?v=1551284786'
      )
    })
  })
})
