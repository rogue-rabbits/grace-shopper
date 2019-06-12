import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Cart = props => {
  console.log('props', props)
  const {cartList} = props

  return <div>TEST</div>
}

/**
 * CONTAINER
 */
const mapStatetoProps = (state, ownProps) => {
  console.log('state', state)
  console.log('ownProps', ownProps)

  return {
    cartList: state.cartReducer
  }
}

export default connect(mapStatetoProps)(Cart)
