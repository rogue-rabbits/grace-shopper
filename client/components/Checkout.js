import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'

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

    console.log(this.state)
  }
  //updates this.state
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    //sends final state to thunk then axios request then db
    // this.props.addCampusToThunk(this.state)
    // this.setState(defaultState)
  }

  render() {
    // console.log(this.state);
    let item
    console.log('CART PROP ', this.props)
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
        <div>Credit Card: </div>
        <input
          name="creditCard"
          type="text"
          value={this.state.creditCard}
          onChange={this.handleChange}
          required
        />
        <button>
          <Link to="/ordercofirm">Submit Order</Link>
        </button>
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
  getCart: () => dispatch(getCartThunk())
})

export default connect(mapStatetoProps, mapDispatchToProps)(Checkout)
