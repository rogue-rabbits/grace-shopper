import React from 'react'
import {getProduct} from '../store/product'
import {addingToCart, updatingCart} from '../store/cart'
import {connect} from 'react-redux'
import Rating from 'react-rating'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Paper'

class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProduct(id)
  }

  render() {
    const {product} = this.props
    const userId = this.props.user.id
    const cart = this.props.cart
    const reviewz = this.props.product.reviews
    console.log('reviews', reviewz)

    let quantity = 1
    let quantityArray = Array.from(Array(10).keys())
    let existingItem = cart.filter(el => el.productId === product.id)
    let dataQuantity = existingItem[0] ? existingItem[0].quantity : 0

    return (
      <>
        <div className="single-product-container">
          <Card className="single-product-left">
            <img src={product.imageUrl} width="200px" height="auto" />
          </Card>
          <div className="single-product-right">
            {' '}
            <h2>{product.name}</h2>
            <h3>Price: ${product.price}</h3>
            <p> {product.description} </p>
            <select
              onChange={event => {
                quantity = parseInt(event.target.value)
              }}
            >
              {quantityArray.map((element, index) => {
                return (
                  <option key={element} value={index + 1}>
                    {element + 1}
                  </option>
                )
              })}
            </select>
            <Button
              variant="contained"
              className="primary-buttons"
              onClick={() => {
                existingItem.length
                  ? this.props.updateCart(
                      userId,
                      product.id,
                      quantity,
                      dataQuantity
                    )
                  : this.props.addToCart(userId, product.id, quantity)
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
        <div>
          <h3 className="single-product-right">REVIEWS: </h3>

          {product.reviews && reviewz.length ? (
            reviewz.map(rev => {
              return (
                <Card key={rev.id} className="single-product-rating">
                  <div>
                    <div>
                      {rev.user.firstName} {rev.user.lastName}
                    </div>
                  </div>
                  <div>
                    <Rating
                      initialRating={rev.rating}
                      readonly
                      emptySymbol={
                        <img src="/tea-cup-empty.png" className="icon" />
                      }
                      fullSymbol={
                        <img src="/tea-cup-full.png" className="icon" />
                      }
                    />
                  </div>
                  <div>
                    <div>{rev.description}</div>
                  </div>
                </Card>
              )
            })
          ) : (
            <div>No Reviews For This Product</div>
          )}
        </div>
      </>
    )
  }
}

// update the quantity

const mapStateToProps = state => ({
  product: state.product.singleProduct,
  user: state.user,
  cart: state.cart
})
const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(getProduct(id)),
  addToCart: (userId, id, quantity) => {
    dispatch(addingToCart(userId, id, quantity))
  },
  updateCart: (userId, itemId, quantity, newQuantity) => {
    dispatch(updatingCart(userId, itemId, quantity, newQuantity))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
