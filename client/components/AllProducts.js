import React from 'react'
import {connect} from 'react-redux'
import {Product} from './index'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Paper'

class AllProducts extends React.Component {
  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={3}
          className="cards-container"
        >
          {this.props.allProducts ? (
            this.props.allProducts.map(product => {
              return (
                // <div key={product.id} className="card">
                <Grid item sm={4} key={product.id}>
                  <Card>
                    <Product product={product} />
                  </Card>
                </Grid>
                // </div>
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

const mapStateToProps = state => ({
  allProducts: state.product.allProducts
})

export default connect(mapStateToProps)(AllProducts)
