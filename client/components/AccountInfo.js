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
      <div className="order-title">Customer Information:</div>
      <Card className="order-card">
        <div>First Name: {currentUser.firstName}</div>
        <div>Last Name: {currentUser.lastName}</div>
        <div>
          Address: {currentUser.address1}, {currentUser.city}{' '}
          {currentUser.state}, {currentUser.zipCode}
        </div>
      </Card>
      <div>
        <div className="order-title">Order History:</div>
        {orderNumbers.map(order => (
          <Card key={order} className="order-card">
            <div className="order-heading">Order Number: {order}</div>
            <div>
              {groupByNo[order].map(element => {
                return (
                  <div key={element.id} className="order-contents">
                    <div className="order-line1">{element.name}</div>
                    <div className="order-line2">
                      Price: {element.price / 100}
                    </div>
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
