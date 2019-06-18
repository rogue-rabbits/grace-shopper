import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {CartItem} from './index'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

/**
 * COMPONENTS
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
    console.log('CART LIST LENGTH', cartList.length)
    return (
      <div className="cart-container">
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item md={8} sm={10}>
            <Paper className="cart-paper">
              <h2>CART</h2>
              <Grid container direction="column" alignItems="center">
                {cartList.map(item => {
                  total += item.product.price * item.quantity
                  return (
                    <Grid item sm={8} key={item.productId}>
                      <CartItem key={item.productId} item={item} />
                    </Grid>
                  )
                })}
              </Grid>
              <Grid container direction="column" alignContent="flex-end">
                <Grid item>
                  <h2>Order Total: ${total / 100}</h2>
                </Grid>
                <Grid item>
                  {cartList.length ? (
                    <button type="button">
                      {isLoggedIn ? (
                        <Link to="/checkout"> Checkout and Pay </Link>
                      ) : (
                        <Link to="/login">Login and Checkout</Link>
                      )}
                    </button>
                  ) : (
                    <button type="button" disabled className="isDisabled">
                      {isLoggedIn ? (
                        <Link to="/checkout"> Checkout and Pay </Link>
                      ) : (
                        <Link to="/login">Login and Checkout</Link>
                      )}
                    </button>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
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
