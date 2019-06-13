import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Cart = props => {
  const {cartList} = props

  return (
    <div>
      <h2>ORDER COMPLETED! THANK YOU.</h2>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapStatetoProps = state => {
  return {
    cartList: state.cart
  }
}

export default connect(mapStatetoProps)(Cart)
