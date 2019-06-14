import React from 'react'
import {connect} from 'react-redux'
import {updatingCart} from '../store/cart'

/**
 * COMPONENT
 */

const defaultState = {
  item: {},
  quantity: 0
}
class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // console.log('prop: ', this.props.item)

    this.setState({item: this.props.item, quantity: this.props.item.quantity})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: Number(evt.target.value)
    })
    console.log('state: ', this.state)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const item = this.state.item
    const quantity = this.state.quantity
    this.props.updateCart(item.user.id, item.product.id, 0, quantity)
  }

  render() {
    const item = this.props.item
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
  }
}

const mapDispatchToProps = dispatch => ({
  updateCart: (userId, itemId, quantity, newQuantity) => {
    dispatch(updatingCart(userId, itemId, quantity, newQuantity))
  }
})

export default connect(null, mapDispatchToProps)(CartItem)
