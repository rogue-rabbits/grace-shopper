import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addingToCart, updatingCart, addingToGuestCart} from '../store'
import Button from '@material-ui/core/Button'

class Product extends React.Component {
  handleAddToCart = () => {
    //if user is logged in
    const {product, cart} = this.props

    if (this.props.user.id) {
      const userId = this.props.user.id
      let existingItem = cart.filter(el => el.productId === product.id)

      let dataQuantity = existingItem[0] ? existingItem[0].quantity : 0
      const quantity = 1

      if (existingItem.length) {
        this.props.updateCart(userId, product.id, quantity, dataQuantity)
      } else {
        this.props.addToCart(userId, product.id, quantity)
      }
    } else {
      this.props.addToGuestCart(product.id, 1)
    }
  }

  render() {
    const product = this.props.product
    return (
      <div className="card-contents" key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img
            className="card-image"
            src={product.imageUrl}
            width="200px"
            height="auto"
          />
        </Link>
        <div className="card-contents">
          <Link to={`/products/${product.id}`}>
            <h2>{product.name}</h2>{' '}
          </Link>
          <h3>Price: ${product.price / 100}</h3>
          <Button variant="contained" onClick={this.handleAddToCart}>
            ADD TO CART
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  addToCart: (userId, productId, quantity) => {
    dispatch(addingToCart(userId, productId, quantity))
  },
  updateCart: (userId, itemId, quantity, newQuantity) => {
    dispatch(updatingCart(userId, itemId, quantity, newQuantity))
  },
  addToGuestCart: (productId, quantity) =>
    dispatch(addingToGuestCart(productId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
