import React from 'react'
import Rating from 'react-rating'

const ProductRating = props => (
  <Rating
    initialRating={props.rating}
    readonly
    emptySymbol={<img src="/tea-cup-empty.png" className="icon" />}
    fullSymbol={<img src="/tea-cup-full.png" className="icon" />}
  />
)

export default ProductRating
