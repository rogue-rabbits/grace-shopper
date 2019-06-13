import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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

    let total = 0
    return (
      <div>
        <h2>CART</h2>
        {cartList.map(item => {
          total += item.product.price * item.quantity
          // this.setState({quantity: item.quantity})
          // console.log('this.state', this.state)
          const itemTotal = item.product.price * item.quantity
          return (
            <div key={item.id}>
              <h2>{item.product.name}</h2>
              <h3>
                Price: ${item.product.price} Quantity: {item.quantity}
              </h3>
              <h3>
                <form onSubmit={this.handleSubmit}>
                  <div>Quantity: </div>
                  <input
                    name="quantity"
                    type="text"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                    required
                  />
                  <button type="submit">Update Quantity</button>
                </form>
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
