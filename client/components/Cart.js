import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {CartItem} from './index'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Paper'

/**
 * COMPONENT
 */

const defaultState = {
  quantity: 0
}
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const {cartList, isLoggedIn} = this.props

    let total = 0
    return (
      <div className="cart-container">
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          xs={8}
        >
          <Card>
            <h2>CART</h2>
            <Grid container direction="column" alignItems="center">
              {cartList.map(item => {
                total += item.product.price * item.quantity
                return (
                  <Grid item sm={8} key={item.id}>
                    <CartItem key={item.id} item={item} />
                  </Grid>
                )
              })}
            </Grid>
            <h2>Order Total: ${total / 100}</h2>

            <button type="button">
              {isLoggedIn ? (
                <Link to="/checkout"> Checkout and Pay </Link>
              ) : (
                <Link to="/login">Login and Checkout</Link>
              )}
            </button>
          </Card>
        </Grid>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStatetoProps = state => {
  return {
    cartList: state.cart,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapStatetoProps)(Cart)
