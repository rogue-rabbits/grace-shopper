import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const getCartQuantity = cart => {
  return cart.reduce((accu, current) => accu + current.quantity, 0)
}

const Navbar = ({handleClick, isLoggedIn, cart}) => {
  const cartQuantity = getCartQuantity(cart)
  return (
    <div className="header">
      <div className="title-header">
        <h1>Rogue Rabbit Teas</h1>
      </div>
      <nav className="navbar">
        {isLoggedIn ? (
          <div className="navbar">
            {/* The navbar will show these links after you log in */}
            <Link to="/users">All Users</Link>
            <Link to="/">Home</Link>
            <Link to="/accountInfo">Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/cart">
              <i className="material-icons md-dark">shopping_cart</i>
            </Link>
          </div>
        ) : (
          <div className="navbar">
            {/* The navbar will show these links before you log in */}
            <Link to="/products">Products</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">
              <i className="material-icons md-dark">shopping_cart</i>
            </Link>
          </div>
        )}
        {cartQuantity > 0 && <div className="nav-cart-qty">{cartQuantity}</div>}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
