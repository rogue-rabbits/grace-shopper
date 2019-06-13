import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, emptyCart} from '../store/cart'
import {addItemsThunk} from '../store/orderHistory'

const defaultState = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  email: ''
  // creditCard: '232'
}

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }
  //updates this.state
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let orderTotal = 0
    const items = this.props.cartList
    items.forEach(item => {
      const price = item.product.price * item.quantity
      orderTotal += price
    })
    items.map(item => {
      item.product.quantity = item.quantity
      item.product.orderNumber = 1010
      item.product.total = orderTotal
      this.props.addOrder(item.product)
    })
    this.props.emptyCart()
    this.props.history.push('/orderconfirmed')
  }

  render() {
    let item
    console.log('cart ', this.props.cartList)
    if (this.props.cartList[0]) {
      item = this.props.cartList[0].user
    } else {
      item = defaultState
    }

    return (
      <form onSubmit={this.handleSubmit} className="checkoutForm">
        <div>First Name: </div>
        <input
          name="firstName"
          type="text"
          value={item.firstName}
          onChange={this.handleChange}
          required
        />
        <div>Last Name: </div>
        <input
          name="lastName"
          type="text"
          value={item.lastName}
          onChange={this.handleChange}
          required
        />
        <div>Address 1: </div>
        <input
          name="address1"
          type="text"
          value={item.address1}
          onChange={this.handleChange}
          required
        />
        {/* <div>Address 2: </div>
        <input
          name="address2"
          type="text"
          value={item.address2}
          onChange={this.handleChange}
          required
        /> */}
        <div>City: </div>
        <input
          name="city"
          type="text"
          value={item.city}
          onChange={this.handleChange}
          required
        />
        <div>State: </div>
        <input
          name="state"
          type="text"
          value={item.state}
          onChange={this.handleChange}
          required
        />
        <div>Zip Code: </div>
        <input
          name="zipCode"
          type="text"
          value={item.zipCode}
          onChange={this.handleChange}
          required
        />
        <div>Email: </div>
        <input
          name="email"
          type="text"
          value={item.email}
          onChange={this.handleChange}
          required
        />
        {/* <div>Credit Card: </div>
        <input
          name="creditCard"
          type="text"
          value={this.state.creditCard}
          onChange={this.handleChange}
          required
        /> */}
        <button type="submit">Submit Order</button>
      </form>
    )
  }
}

/**
 * CONTAINER
 */
const mapStatetoProps = state => {
  return {
    cartList: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  addOrder: item => dispatch(addItemsThunk(item)),
  emptyCart: () => dispatch(emptyCart())
})

export default connect(mapStatetoProps, mapDispatchToProps)(Checkout)
