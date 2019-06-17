import React from 'react'
import {getProduct} from '../store/product'
import {addingToCart, updatingCart} from '../store/cart'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Paper'
import ProductRating from './ProductRating'
import RatingForm from './RatingForm'
import meanBy from 'lodash/meanBy'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showForm: false}
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProduct(id)
  }

  toggleForm = () => {
    const {showForm} = this.state
    this.setState({showForm: !showForm})
  }

  render() {
    const {product, cart} = this.props
    const userId = this.props.user.id
    const reviews = this.props.product.reviews
    const averageRating = meanBy(reviews, 'rating')

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
            <ProductRating rating={averageRating} />
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
          <Button
            variant="contained"
            className="primary-buttons"
            onClick={this.toggleForm}
          >
            Write A Review
          </Button>
          {this.state.showForm && (
            <>
              {userId ? (
                <RatingForm closeForm={this.toggleForm} id={product.id} />
              ) : (
                <div>Please sign in to add review. </div>
              )}
            </>
          )}
          {product.reviews && reviews.length ? (
            reviews.map(rev => {
              return (
                <Card key={rev.id} className="single-product-rating">
                  <div>
                    <div>
                      {rev.user.firstName} {rev.user.lastName}
                    </div>
                  </div>
                  <div>
                    <ProductRating rating={rev.rating} />
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
