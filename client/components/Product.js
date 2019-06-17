import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addingToCart} from '../store'
import Button from '@material-ui/core/Button'

const Product = props => {
  const product = props.product

  return (
    <div className="card-contents" key={product.key}>
      <Link to={`/products/${product.id}`}>
        <img
          className="card-image"
          src={product.imageUrl}
          width="200px"
          height="auto"
        />
      </Link>
      <div>
        <Link to={`/products/${product.id}`}>
          <h2>{product.name}</h2>{' '}
        </Link>
        <h3>Price: ${product.price}</h3>
        <Button
          variant="contained"
          onClick={() => props.addToCart(props.user.id, product.id, 1)}
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  addToCart: (userId, productId, quantity) => {
    dispatch(addingToCart(userId, productId, quantity))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
