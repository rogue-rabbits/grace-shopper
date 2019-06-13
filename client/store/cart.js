import axios from 'axios'

// Action Type
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

const UPDATE_CART = 'UPDATE_CART'

const EMPTY_CART = 'EMPTY_CART'


//Action Creators
const getCart = items => ({type: GET_CART, items})
const addToCart = item => ({
  type: ADD_TO_CART,
  item
})
const updateCart = item => ({
  type: UPDATE_CART,
  item
})

export const emptyCart = () => ({type: EMPTY_CART})


//Thunk Creators
export function addingToCart(userId, itemId, quantity) {
  return async dispatch => {
    try {
      // const existingProduct = await axios.get('/api/cart');
      const newCartItem = {
        productId: itemId,
        quantity: quantity,
        userId: userId
      }
      let {data} = await axios.post('/api/cart', newCartItem)
      //get the productId information from database
      const product = await axios.get(`/api/products/${data.productId}`)
      //attach product information to newCartItem
      data.product = product.data
      //get req.user from express
      const user = await axios.get('/api/user')
      //attach user information to newCartItem
      data.user = user
      dispatch(addToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export function updatingCart(userId, itemId, selectedQuantity, dataQuantity) {
  return async dispatch => {
    try {
      const newQuantity = selectedQuantity + dataQuantity
      const updatedCartItem = {
        productId: itemId,
        quantity: newQuantity,
        userId: userId
      }
      const {data} = await axios.put('/api/cart', updatedCartItem)
      dispatch(updateCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export function getCartThunk() {
  return async dispatch => {
    try {
      //response.data =[]
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
    } catch (err) {
      console.log('error in cart get thunk')
    }
  }
}

//Reducer

export default function(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.items
    case ADD_TO_CART:
      const newItem = {
        userId: action.item.userId,
        productId: action.item.productId,
        quantity: action.item.quantity,
        product: action.item.product,
        user: action.item.user
      }
      return [...state, newItem]
    case UPDATE_CART:
      const updatedItem = {
        userId: action.userId,
        productId: action.productId,
        quantity: action.quantity
      }
      return state.map(
        el =>
          el.productId === action.item.productId &&
          el.userId === action.item.userId
            ? action.item
            : el
      )

    case EMPTY_CART:
      return []
    default:
      return state
  }
}
