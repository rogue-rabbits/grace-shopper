import React from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Paper'
import {getUsers, deletingUser} from '../store/users'

class Users extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    // console.log('THIS PROPS', this.props);
    this.props.getAllUsers()
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1 className="order-title">Users list:</h1>
        {this.props.users
          ? this.props.users.map(user => (
              <div key={user.id} id="user">
                <Card className="order-card">
                  <div>First Name: {user.firstName}</div>
                  <div>Last Name: {user.lastName}</div>
                  <div>
                    Address: {user.address1}, {user.city} {user.state},{' '}
                    {user.zipCode}
                  </div>
                </Card>
                <button
                  type="button"
                  onClick={() => this.props.deleteUser(user.id)}
                >
                  DELETE USER
                </button>
              </div>
            ))
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getUsers()),
  deleteUser: id => dispatch(deletingUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
