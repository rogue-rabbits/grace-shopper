import React from 'react'
import {connect} from 'react-redux'
import {updatingCart, deletingItem} from '../store/cart'

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
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    // console.log('prop: ', this.props.item)

    this.setState({item: this.props.item, quantity: this.props.item.quantity})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: Number(evt.target.value)
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const item = this.state.item
    const quantity = this.state.quantity
    this.props.updateCart(item.userId, item.product.id, 0, quantity)
  }

  handleDelete() {
    const productId = this.state.item.productId
    this.props.deleteItem(productId)
  }

  render() {
    const item = this.props.item
    const itemTotal = item.product.price * item.quantity / 100
    let quantityArray = Array.from(Array(10).keys())
    return (
      <div key={item.id}>
        <h2>{item.product.name}</h2>
        <h3>Price: ${item.product.price / 100}</h3>
        <h3>
          <div>Quantity: {item.quantity}</div>
          <select
            onChange={event => {
              this.setState({quantity: parseInt(event.target.value)})
            }}
            defaultValue={this.state.quantity}
          >
            {quantityArray.map((element, index) => {
              return (
                <option key={element} value={index + 1}>
                  {element + 1}
                </option>
              )
            })}
          </select>

          <button type="submit" onClick={this.handleSubmit}>
            Update Quantity
          </button>
          <button type="button" onClick={this.handleDelete}>
            Remove
          </button>
        </h3>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCart: (userId, itemId, quantity, newQuantity) => {
    dispatch(updatingCart(userId, itemId, quantity, newQuantity))
  },
  deleteItem: productId => {
    dispatch(deletingItem(productId))
  }
})

export default connect(null, mapDispatchToProps)(CartItem)
