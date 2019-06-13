import React from 'react'
import PropTypes from 'prop-types'
import {getProduct} from '../store/product'
import {addingToCart, updatingCart} from '../store/cart'
import {Navbar, Product} from './index'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProduct(id)
  }

  render() {
    const product = this.props.product
    const userId = this.props.user.id
    const cart = this.props.cart
    let quantity = 1
    let quantityArray = Array.from(Array(10).keys())
    let existingItem = cart.filter(el => el.productId === product.id)
    let dataQuantity = existingItem[0] ? existingItem[0].quantity : 0

    return (
      <div>
        <img src={product.imageUrl} width="200px" height="auto" />
        <h2>{product.name}</h2>
        <h3>Price: ${product.price}</h3>
        <p> {product.description} </p>
        <select
          onChange={event => {
            quantity = parseInt(event.target.value)
          }}
        >
          {quantityArray.map((element, index) => {
            return (
              <option key={index} value={index + 1}>
                {element + 1}
              </option>
            )
          })}
        </select>
        <button
          onClick={() => {
            existingItem.length
              ? this.props.updateCart(
                  userId,
                  product.id,
                  quantity,
                  dataQuantity
                )
              : this.props.addToCart(userId, product.id, quantity)
          }}
        >
          Add to Cart
        </button>
      </div>
    )
  }
}

// update the quantity

const mapStateToProps = state => ({
  product: state.product.singleProduct,
  user: state.user,
  cart: state.cart
})
const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(getProduct(id)),
  addToCart: (userId, id, quantity) => {
    dispatch(addingToCart(userId, id, quantity))
  },
  updateCart: (userId, itemId, quantity, newQuantity) => {
    dispatch(updatingCart(userId, itemId, quantity, newQuantity))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
