import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  const product = props.product
  return (
    <div key={product.key}>
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} width="200px" height="auto" />
        <h2>{product.name}</h2>{' '}
      </Link>
      <h3>Price: ${product.price}</h3>
    </div>
  )
}

export default Product
