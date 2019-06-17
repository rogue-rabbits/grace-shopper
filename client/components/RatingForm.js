import React, {Component} from 'react'
import Rating from 'react-rating'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {addReviewThunk} from '../store/product'

const defaultState = {
  rating: 0,
  message: ''
}

class RatingForm extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
  }

  handleRating = event => {
    this.setState({rating: +event})
  }

  //updates this.state
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const {closeForm, postReview, id} = this.props
    closeForm()
    postReview({rating: this.state.rating, message: this.state.message}, id)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <Rating
            initialRating={this.state.rating}
            onChange={this.handleRating}
            emptySymbol={<img src="/tea-cup-empty.png" className="icon" />}
            fullSymbol={<img src="/tea-cup-full.png" className="icon" />}
          />
          <textarea
            rows="4"
            cols="50"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
            placeholder="Enter your tea review here..."
          />
          <Button variant="contained" className="primary-buttons" type="submit">
            Submit Review
          </Button>
        </div>
      </form>
    )
  }
}

const mapDispatchtoProps = dispatch => ({
  postReview: (review, id) => dispatch(addReviewThunk(review, id))
})

export default connect(null, mapDispatchtoProps)(RatingForm)
