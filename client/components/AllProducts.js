import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/product'
import {Product} from './index'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Paper'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        <Grid container spacing={3} className="cards-container">
          {this.props.allProducts ? (
            this.props.allProducts.map(product => {
              return (
                <div key={product.id} className="card">
                  <Grid item>
                    <Card>
                      <Product product={product} />
                    </Card>
                  </Grid>
                </div>
              )
            })
          ) : (
            <div> LOADING </div>
          )}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({allProducts: state.product.allProducts})
const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
