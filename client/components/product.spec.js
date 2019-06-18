import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import React from 'react'
import {Product} from './Product'
import AllProducts from './AllProducts'
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()
const store = mockStore({})
// let store;
let mockAxios

const PRODUCTS = [
  {
    id: 1,
    name: 'Royal Wedding Tea',
    type: 'White Tea',
    price: 2800,
    description:
      'White tea is made from the young tea bud. It is plucked just before the leaf opens on the stem and is air-dried to lock in its color and flavor. The chlorophyll is not mature in this bud and that gives its “white” appearance. We add flavors to make delicate and delectable teas. Look for gently sweet notes ranging from honeysuckle to light maple sap, citrus fruit flavors like orange and lemon, and wisps of floral aromas, evoking jasmine and rose. The delicacy of white tea leaves allows wonderfully subtle flavors to flourish in your freshly brewed cup!',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_Royal_Wedding_800x.jpg?v=1551284786'
  },
  {
    id: 2,
    name: 'White Peach',
    type: 'White Tea',
    price: 1900,
    description:
      "Subtle and refined, our White Peach tea delivers a delicate, sweet palate full of scrumptious flavors. We begin with subtle hand-picked Chinese Mutan White tea, full of light vegetal flavors, and augment its smooth and welcoming palate with sweet notes of peach for a body that's strong without being brash. Finally, an even-handed touch of natural vanilla swirls through, bringing this reliably enjoyable brew to a close",
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_White_Peach_800x.jpg?v=1551287422'
  },
  {
    id: 3,
    name: 'English Breakfast',
    type: 'Black Tea',
    price: 5000,
    description:
      "There are many versions of English Breakfast tea. Ours has an ancient pedigree. Researchers have traced its heritage back to the black tea the English drank regularly in the 1800's. It is, simply, China Black 100% Keemun. A simple way to start your hectic day! ",
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1234/1342/products/Cup_Shots_English_Breakfast_800x.jpg?v=1554494277'
  }
]

function getRandomProduct(products) {
  return products[Math.floor(Math.random() * products.length)]
}

describe('Front-End', () => {
  describe('<AllProducts /> component', () => {
    it('renders one div', async () => {
      const wrapper = shallow(
        <Provider store={store}>
          <div>
            <AllProducts />
          </div>
        </Provider>
      )
      const listItems = wrapper.find('div')
      expect(listItems).to.have.length(1)
    })

    // it('has a Product component', () => {
    // 	const wrapper = shallow(
    // 		<Provider store={store}>
    // 			<div>
    // 				<AllProducts />
    // 			</div>
    // 		</Provider>
    // 	);
    // 	// eslint-disable-next-line no-unused-expressions
    // 	expect(wrapper.find(Product)).to.exist;
    // });
  })

  describe('<Product /> component', () => {
    let renderedProduct
    let oneProduct
    beforeEach('Create component', () => {
      oneProduct = getRandomProduct(PRODUCTS)
      renderedProduct = shallow(
        <Provider store={store}>
          <Product product={oneProduct} />
        </Provider>
      )
    })
    // it('has a product in props', () => {
    // 	// eslint-disable-next-line no-unused-expressions
    // 	expect(renderedProduct.props().children.props.product).to.exist;
    // });

    it('renders product name', async () => {
      const component = renderedProduct.findWhere(
        n => n.type() === 'h3' && n.contains(oneProduct.name)
      )
    })

    it('renders product price', async () => {
      expect(
        renderedProduct.findWhere(
          n => n.type() === 'h3' && n.contains(oneProduct.price)
        )
      )
    })

    it('renders product image', async () => {
      expect(
        renderedProduct.findWhere(
          n => n.type() === 'img' && n.contains(oneProduct.imageUrl)
        )
      )
    })

    it('has an add-to-cart button', async () => {
      expect(renderedProduct.find('button'))
    })
  })
})
