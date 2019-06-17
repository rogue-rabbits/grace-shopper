import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    const name = `${this.props.customer.firstName} ${
      this.props.customer.lastName
    }`
    let {token} = await this.props.stripe.createToken({name: name})
    let response = await axios.post('/api/stripe/charge', {
      amount: this.props.customer.orderTotal,
      body: token.id
    })

    if (response.data.status === 'succeeded') this.setState({complete: true})
    this.props.handleSubmit()
  }

  render() {
    return (
      <div className="checkout">
        <CardElement />
        <button onClick={this.submit}>Complete Order</button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
