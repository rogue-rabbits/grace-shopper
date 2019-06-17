import axios from 'axios'

// Initial State
const initialState = {
  allProducts: [],
  singleProduct: {}
}

// Action Type
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const ADD_REVIEW = 'ADD_REVIEW'

// Action Creators
const gotProducts = products => ({type: GET_ALL_PRODUCTS, products})
const gotProduct = product => ({type: GET_SINGLE_PRODUCT, product})
const addReview = (review, id) => ({type: ADD_REVIEW, review, id})

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

export const addReviewThunk = (review, id) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/products/${id}/review`, review)
    dispatch(addReview(data, id))
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
    case ADD_REVIEW:
      return {
        ...state,
        singleProduct: {
          ...state.singleProduct,
          reviews: [...state.singleProduct.reviews, action.review]
        }
      }
    default:
      return state
  }
}
