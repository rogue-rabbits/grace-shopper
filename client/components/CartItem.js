import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updatingCart, deletingItem} from '../store/cart'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Paper'

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
    const [product] = this.props.productList.filter(
      el => el.id === item.productId
    )
    const itemTotal = item.product.price * item.quantity / 100
    let quantityArray = Array.from(Array(10).keys())
    return (
      <div key={item.id}>
        <Link to={`/products/${product.id}`}>
          <h2>{item.product.name}</h2>
        </Link>
        <Grid container direction="column" alignItems="flex-end">
          <Link to={`/products/${product.id}`}>
            <Card>
              <img src={product.imageUrl} width="200px" height="auto" />
            </Card>
          </Link>
          <Grid container justify="space-between">
            <Grid item>
              <h3>Price: ${item.product.price / 100}</h3>
            </Grid>
            <Grid item>
              <h3>Quantity: {item.quantity}</h3>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
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
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <button type="button" onClick={this.handleDelete}>
              Remove
            </button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    productList: state.product.allProducts
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

export default connect(mapStatetoProps, mapDispatchToProps)(CartItem)
