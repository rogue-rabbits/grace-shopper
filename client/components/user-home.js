import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AllProducts} from './index.js'
import {copyingGuestCartToDatabase} from '../store/cart'
import {getLastOrderThunk} from '../store/orderHistory'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    this.props.copyGuestCartToDatabase()
    this.props.getLastOrder()
  }

  render() {
    const {email, name} = this.props
    return (
      <div className="container">
        <h3>Welcome, {name}!</h3>
        <AllProducts />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.firstName
  }
}

const mapDispatch = dispatch => ({
  copyGuestCartToDatabase: () => dispatch(copyingGuestCartToDatabase()),
  getLastOrder: () => dispatch(getLastOrderThunk())
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
