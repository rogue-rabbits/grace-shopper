import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Cart = props => {
  console.log('props', props)
  const {cartList} = props
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
    </div>
  )
}

/**
 * CONTAINER
 */
const mapStatetoProps = (state, ownProps) => {
  console.log('state', state)
  console.log('ownProps', ownProps)

  return {
    cartList: state.cart
  }
}

export default connect(mapStatetoProps)(Cart)
