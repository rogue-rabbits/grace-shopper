'use strict'

const db = require('../server/db')
const {User, Product, Cart, OrderHistory} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Coderson',
      address1: '111 Internet St',
      city: 'New York',
      state: 'NY',
      zipCode: '12345',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Murpherson',
      address1: '789 Web Dr',
      city: 'New York',
      state: 'NY',
      zipCode: '56789',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Kelly',
      lastName: 'Clarkson',
      address1: '567 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      email: 'kelly@email.com',
      password: '123'
    })
  ])

  const product = await Promise.all([
    Product.create({
      name: 'Royal Wedding Tea',
      type: 'White Tea',
      price: 28.0,
      description:
        'White tea is made from the young tea bud. It is plucked just before the leaf opens on the stem and is air-dried to lock in its color and flavor. The chlorophyll is not mature in this bud and that gives its “white” appearance. We add flavors to make delicate and delectable teas. Look for gently sweet notes ranging from honeysuckle to light maple sap, citrus fruit flavors like orange and lemon, and wisps of floral aromas, evoking jasmine and rose. The delicacy of white tea leaves allows wonderfully subtle flavors to flourish in your freshly brewed cup!',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_Royal_Wedding_800x.jpg?v=1551284786'
    }),
    Product.create({
      name: 'White Peach',
      type: 'White Tea',
      price: 19.0,
      description:
        "Subtle and refined, our White Peach tea delivers a delicate, sweet palate full of scrumptious flavors. We begin with subtle hand-picked Chinese Mutan White tea, full of light vegetal flavors, and augment its smooth and welcoming palate with sweet notes of peach for a body that's strong without being brash. Finally, an even-handed touch of natural vanilla swirls through, bringing this reliably enjoyable brew to a close",
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_White_Peach_800x.jpg?v=1551287422'
    }),
    Product.create({
      name: 'Venetian Tiramisu',
      type: 'White Tea',
      price: 19.99,
      description:
        'Indulge your senses in the flavors of Venetian Tiramisu tea. Evocative and romantic, each cup begins with a blend of delicately floral Mutan white tea and toasty Japanese Hojicha. Swirling flavors of cocoa and vanilla layer throughout the tea, accented with cocoa nibs and just a hint of brandy flavor. The result is a shimmering, deliciously complex infusion that summons up visions of Venice in every sip.',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_2_05_2018_Venetian_Tiramisu_800x.jpg?v=1551286805'
    })
  ])

  const cart = await Promise.all([
    Cart.create({
      productId: 1,
      quantity: 3,
      userId: 1
    }),
    Cart.create({
      productId: 2,
      quantity: 2,
      userId: 1
    }),
    Cart.create({
      productId: 3,
      quantity: 3,
      userId: 2
    }),
    Cart.create({
      productId: 3,
      quantity: 9,
      userId: 3
    }),
    Cart.create({
      productId: 2,
      quantity: 10,
      userId: 3
    })
  ])

  const orderHistory = await Promise.all([
    OrderHistory.create({
      name: 'White Peach',
      price: 19.0,
      quantity: 2,
      total: 38.0,
      orderNumber: 10001,
      userId: 1
    }),
    OrderHistory.create({
      name: 'Black Tea',
      price: 10.0,
      quantity: 2,
      total: 20.0,
      orderNumber: 10002,
      userId: 2
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
