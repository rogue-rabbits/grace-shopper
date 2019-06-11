import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  const product = props.product
  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} />
        <h2>{product.name}</h2>{' '}
      </Link>
      <h3>{product.price}</h3>
    </div>
  )
}

export default Product
