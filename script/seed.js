'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Cart,
  OrderHistory,
  Review
} = require('../server/db/models')

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
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Murpherson',
      address1: '789 Web Dr',
      city: 'New York',
      state: 'NY',
      zipCode: '56789',
      email: 'murphy@email.com',
      password: '123',
      isAdmin: false
    }),
    User.create({
      firstName: 'Kelly',
      lastName: 'Clarkson',
      address1: '567 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      email: 'kelly@email.com',
      password: '123',
      isAdmin: false
    })
  ])

  const product = await Promise.all([
    Product.create({
      name: 'Royal Wedding Tea',
      type: 'White Tea',
      price: 2800,
      description:
        'White tea is made from the young tea bud. It is plucked just before the leaf opens on the stem and is air-dried to lock in its color and flavor. The chlorophyll is not mature in this bud and that gives its “white” appearance. We add flavors to make delicate and delectable teas. Look for gently sweet notes ranging from honeysuckle to light maple sap, citrus fruit flavors like orange and lemon, and wisps of floral aromas, evoking jasmine and rose. The delicacy of white tea leaves allows wonderfully subtle flavors to flourish in your freshly brewed cup!',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_Royal_Wedding_800x.jpg?v=1551284786'
    }),
    Product.create({
      name: 'White Peach',
      type: 'White Tea',
      price: 1900,
      description:
        "Subtle and refined, our White Peach tea delivers a delicate, sweet palate full of scrumptious flavors. We begin with subtle hand-picked Chinese Mutan White tea, full of light vegetal flavors, and augment its smooth and welcoming palate with sweet notes of peach for a body that's strong without being brash. Finally, an even-handed touch of natural vanilla swirls through, bringing this reliably enjoyable brew to a close",
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_White_Peach_800x.jpg?v=1551287422'
    }),
    Product.create({
      name: 'Venetian Tiramisu',
      type: 'White Tea',
      price: 1999,
      description:
        'Indulge your senses in the flavors of Venetian Tiramisu tea. Evocative and romantic, each cup begins with a blend of delicately floral Mutan white tea and toasty Japanese Hojicha. Swirling flavors of cocoa and vanilla layer throughout the tea, accented with cocoa nibs and just a hint of brandy flavor. The result is a shimmering, deliciously complex infusion that summons up visions of Venice in every sip.',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_2_05_2018_Venetian_Tiramisu_800x.jpg?v=1551286805'
    }),
    Product.create({
      name: 'Matcha',
      type: 'Green Tea',
      price: 3600,
      description:
        "Powdered green teas have been consumed in China and Japan for centuries. However it is only in the last few decades that Westerners have acquired a taste for this ancient tea. We enjoy the bracing vegetal flavors, as well as the unusual process for preparing the tea. We offer a range of thin, thick and extra thick Matcha grades depending upon your taste and purpose, as well as accessories you'll need for preparation and serving. Be sure to check out our tea collections for more delicious brew options.",
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1234/1342/products/Harney_Flavored_Matcha_White_Peach_800x.jpg?v=1551287436'
    }),
    Product.create({
      name: 'English Breakfast',
      type: 'Black Tea',
      price: 5000,
      description:
        "There are many versions of English Breakfast tea. Ours has an ancient pedigree. Researchers have traced its heritage back to the black tea the English drank regularly in the 1800's. It is, simply, China Black 100% Keemun. A simple way to start your hectic day! ",
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_English_Breakfast_800x.jpg?v=1554494277'
    }),
    Product.create({
      name: 'Darjeeling',
      type: 'Black Tea',
      price: 2100,
      description:
        'High in the mountains, deep in the mists that surround the Himalayas is Darjeeling, "Queen of Teas." Our Darjeeling tea is a blend of First Flush and Autumnal teas from the best gardens. This mixture yields a light color in the cup  a fragrant nose.',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_Darjeeling_800x.jpg?v=1554129251'
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
      price: 1900,
      quantity: 2,
      total: 3800,
      orderNumber: 10001,
      userId: 1
    }),
    OrderHistory.create({
      name: 'Black Tea',
      price: 1000,
      quantity: 2,
      total: 2000,
      orderNumber: 10002,
      userId: 2
    })
  ])

  const review = await Promise.all([
    Review.create({
      userId: 1,
      productId: 1,
      rating: 4,
      description:
        'A wonderful alternative to my traditional teas. Enjoyed after a meal, almost like a dessert. Has a nice hint of vanilla'
    }),
    Review.create({
      userId: 2,
      productId: 1,
      rating: 5,
      description: 'This is one of my favorite teas, light but flavorful.'
    }),
    Review.create({
      userId: 3,
      productId: 1,
      rating: 4,
      description:
        "I bought Royal Wedding tea for the first time after being gifted a rather old sachet from a friend and loving it. I got my mom hooked on it as well, and it quickly became her favorite tea. I was going to order the one pound bag (seriously), but was horrified to discover the tea completely out of stock. After waiting a month or so, I checked back to discover that at least the 2oz tins were back just in time for my mom's birthday. The delicate chocolate/vanilla flavor (without any chocolate in the ingredients - still a mystery to me) is positively enchanting, and I very much hope Harney and Sons does not discontinue it any time soon."
    }),
    Review.create({
      userId: 1,
      productId: 2,
      rating: 4,
      description:
        'It is a very flavorful and good tasting tea. It has floral notes. It tastes great with honey!'
    }),
    Review.create({
      userId: 2,
      productId: 2,
      rating: 4,
      description:
        'A delicate blend white tea with rose petals, almond, coconut, and vanilla ~ a lovely cup after dinner.'
    }),
    Review.create({
      userId: 1,
      productId: 4,
      rating: 5,
      description:
        'I first had this tea in San Diego at an English High Tea. So glad to be able to purchase and continue to enjoy. Harney Teas are the best!'
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
