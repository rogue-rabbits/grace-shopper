import axios from 'axios'

// Initial State
const initialState = {
  allProducts: [],
  singleProduct: {}
}

// Action Type
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// Action Creators
const gotProducts = products => ({type: GET_ALL_PRODUCTS, products})
const gotProduct = product => ({type: GET_SINGLE_PRODUCT, product})

// Thunk Creators
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(gotProducts(res.data || initialState.products))
  } catch (err) {
    console.error(err)
  }
}

export const getProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(gotProduct(res.data || initialState.product))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, allProducts: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}
