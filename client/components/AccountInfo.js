import React from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Paper'
import groupBy from 'lodash/groupBy'

const AccountInfo = props => {
  const {allHistory, currentUser} = props
  const groupByNo = groupBy(allHistory, 'orderNumber')
  const orderNumbers = Object.keys(groupByNo)

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
      <div>
        <br />
        Order History:
        {orderNumbers.map(order => (
          <Card key={order} className="order-card">
            <div className="order-heading">Order Number: {order}</div>
            <div>
              {groupByNo[order].map(element => {
                return (
                  <div key={element.id} className="order-contents">
                    <div className="order-line1">Name: {element.name}</div>
                    <div className="order-line2">Price: {element.price}</div>
                    <div className="order-line2">
                      Quantity: {element.quantity}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  allHistory: state.orderHistory.allOrders,
  currentUser: state.user
})

export default connect(mapStateToProps)(AccountInfo)
