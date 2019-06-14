import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AllProducts} from './index.js'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, name} = props
  console.log('NAME', name)
  return (
    <div className="container">
      <h3>Welcome, {name}!</h3>
      <AllProducts />
    </div>
  )
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
