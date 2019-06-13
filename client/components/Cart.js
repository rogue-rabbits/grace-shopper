import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Cart = props => {
  const {cartList, isLoggedIn} = props

  let total = 0
  return (
    <div>
      <h2>CART</h2>
      {cartList.map(item => {
        total += item.product.price * item.quantity
        const itemTotal = item.product.price * item.quantity
        return (
          <div key={item.id}>
            <h2>{item.product.name}</h2>
            <h3>
              Price: ${item.product.price} Quantity: {item.quantity}
            </h3>
            <h3>Sub Total: ${itemTotal}</h3>
          </div>
        )
      })}
      <h2>Order Total: ${total.toFixed(2)}</h2>

      <button>
        {isLoggedIn ? (
          <Link to="/checkout"> Checkout and Pay </Link>
        ) : (
          <Link to="/login">Login and Checkout</Link>
        )}
      </button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapStatetoProps = state => {
  return {
    cartList: state.cart,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapStatetoProps)(Cart)
