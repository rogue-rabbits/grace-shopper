import React from 'react'
import {getProduct} from '../store/product'
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
    return (
      <div>
        <img src={product.imageUrl} width="200px" height="auto" />
        <h2>{product.name}</h2>
        <h3>Price: ${product.price}</h3>
        <p> {product.description} </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({product: state.product.singleProduct})
const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(getProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
