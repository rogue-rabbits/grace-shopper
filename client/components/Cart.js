import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {CartItem} from './index'

/**
 * COMPONENT
 */

const defaultState = {
  quantity: 0
}
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const {cartList, isLoggedIn} = this.props
    console.log('cartList ', cartList)

    let total = 0
    return (
      <div>
        <h2>CART</h2>
        {cartList.map(item => {
          total += item.product.price * item.quantity
          return <CartItem key={item.productId} item={item} />
        })}
        <h2>Order Total: ${total / 100}</h2>

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
