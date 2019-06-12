import React from 'react'
import PropTypes from 'prop-types'
import {getProduct} from '../store/product'
import {addingToCart} from '../store/cart'
import {Navbar, Product} from './index'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProduct(id)
  }

  render() {
    const product = this.props.product
    const userId = this.props.user.id
    let quantity
    let quantityArray = Array.from(Array(10).keys())
    return (
      <div>
        <img src={product.imageUrl} width="200px" height="auto" />
        <h2>{product.name}</h2>
        <h3>Price: ${product.price}</h3>
        <p> {product.description} </p>
        <select
          onChange={event => {
            quantity = parseInt(event.target.value)
            console.log('quantity:', quantity)
          }}
        >
          {quantityArray.map((element, index) => {
            return (
              <option key={index} value={index + 1}>
                {element + 1}
              </option>
            )
          })}
        </select>
        <button
          onClick={() => this.props.addToCart(userId, product.id, quantity)}
        >
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product.singleProduct,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(getProduct(id)),
  addToCart: (userId, id, quantity) => {
    dispatch(addingToCart(userId, id, quantity))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
