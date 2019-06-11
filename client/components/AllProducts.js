import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/product'
import {Navbar, Product} from './index'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        {this.props.allProducts ? (
          this.props.allProducts.map(product => {
            return (
              <div key={product.key}>
                <Product product={product} />
              </div>
            )
          })
        ) : (
          <div> LOADING </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({allProducts: state.product.allProducts})
const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
