import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addingToCart, updatingCart} from '../store'
import Button from '@material-ui/core/Button'
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from 'react-toasts'

const Product = props => {
  const product = props.product
  const cart = props.cart
  let cartItem = cart.filter(el => product.id === el.productId)
  let existingQuant = cartItem[0] ? cartItem[0].quantity : 0
  return (
    <div className="card-contents" key={product.key}>
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
        <Button
          variant="contained"
          onClick={() => {
            cartItem.length
              ? props.updateCart(props.user.id, product.id, existingQuant, 1)
              : props.addToCart(props.user.id, product.id, 1)
            ToastsStore.success(`${product.name} is added to cart!`)
          }}
        >
          ADD TO CART
        </Button>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
          lightBackground
        />
      </div>
    </div>
  )
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
