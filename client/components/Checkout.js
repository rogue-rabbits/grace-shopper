import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, emptyCart} from '../store/cart'
import {addItemsThunk, updateLastOrder} from '../store/orderHistory'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'

import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

const defaultState = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  email: '',
  orderTotal: 0
}

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const user = this.props.cartList[0].user
    let orderTotal = 0
    const items = this.props.cartList
    items.forEach(item => {
      const price = item.product.price * item.quantity
      orderTotal += price
    })
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      address1: user.address1,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      email: user.email,
      orderTotal: orderTotal
    })
    this.props.getCart()
  }
  //updates this.state
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    // evt.preventDefault()

    const items = this.props.cartList
    const orderNumber = this.props.lastOrderNumber + 1
    this.props.updateLastOrder(orderNumber)
    items.map(item => {
      item.product.quantity = item.quantity
      item.product.orderNumber = orderNumber
      item.product.total = this.state.orderTotal
      this.props.addOrder(item.product)
    })
    this.props.emptyCart()
    this.props.history.push('/orderconfirmed')
  }

  render() {
    let item

    if (this.props.cartList[0]) {
      item = this.props.cartList[0].user
    } else {
      item = defaultState
    }

    return (
      <div className="checkout-container">
        <Grid container spacing={3} justify="center">
          <Grid item sm={10} md={8}>
            <Paper>
              <form className="checkoutForm">
                <div>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        fullWidth
                        autoComplete="fname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        autoComplete="lname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="E-mail"
                        fullWidth
                        value={this.state.email}
                        onChange={this.handleChange}
                        autoComplete="lname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        value={this.state.address1}
                        onChange={this.handleChange}
                        autoComplete="billing address-line1"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        value={item.address2}
                        onChange={this.handleChange}
                        autoComplete="billing address-line2"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        value={this.state.city}
                        onChange={this.handleChange}
                        autoComplete="billing address-level2"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        value={this.state.state}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        value={this.state.zipCode}
                        onChange={this.handleChange}
                        autoComplete="billing postal-code"
                      />
                    </Grid>
                  </Grid>
                </div>
              </form>
              <div className="checkout">
                <StripeProvider apiKey="pk_test_x3CRlnur814woLKzHiOX9Feq00wXadZoZZ">
                  <Elements>
                    <CheckoutForm
                      customer={this.state}
                      handleSubmit={this.handleSubmit}
                    />
                  </Elements>
                </StripeProvider>
              </div>
            </Paper>
          </Grid>
        </Grid>
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
    lastOrderNumber: state.orderHistory.lastOrderNum
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  addOrder: item => dispatch(addItemsThunk(item)),
  emptyCart: () => dispatch(emptyCart()),
  updateLastOrder: item => dispatch(updateLastOrder(item))
})

export default connect(mapStatetoProps, mapDispatchToProps)(Checkout)
