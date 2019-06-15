import React from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const AccountInfo = props => {
  const {allHistory, currentUser} = props
  console.log(props)
  return (
    <div>
      <div>
        <br />
        First Name: {currentUser.firstName}
        <br />
        Last Name: {currentUser.lastName}
        <br />
        Address: {currentUser.address1}, {currentUser.city} {currentUser.state},{' '}
        {currentUser.zipCode}
      </div>
      <Grid container spacing={4} className="cards-container">
        <div>
          <br />
          Order History:
          {allHistory.map(element => {
            return (
              <Card key={element.id}>
                <div className="card-contents">
                  Name: {element.name}
                  <br />
                  Price: {element.price}
                  <br />
                  Quantity: {element.quantity}
                  <br />
                  Order #: {element.orderNumber}
                  <br />
                </div>
              </Card>
            )
          })}
        </div>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  allHistory: state.orderHistory.allOrders,
  currentUser: state.user
})

export default connect(mapStateToProps)(AccountInfo)
