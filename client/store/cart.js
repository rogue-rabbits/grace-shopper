import axios from 'axios'

//Initial State
// const initialState = {
//   allItems: []
// }

// Action Type
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

//Action Creators
const getCart = items => ({type: GET_CART, items})
const addToCart = item => ({
  type: ADD_TO_CART,
  item
  // userId,
  // itemId,
  // quantity
})

export function addingToCart(userId, itemId, quantity) {
  return async dispatch => {
    try {
      const newCartItem = {
        productId: itemId,
        quantity: quantity,
        userId: userId
      }
      console.log('NEW CART ITEM:', newCartItem)
      const {data} = await axios.post('/api/cart', newCartItem)
      console.log('DATA:', data)
      dispatch(addToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//Thunk Creators
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
      // console.log("action", action);
      return action.items
    case ADD_TO_CART:
      // const existingItem = Cart.findById(action.item.id)
      // if (existingItem) {

      // }

      const newItem = {
        userId: action.userId,
        productId: action.productId,
        quantity: action.quantity
      }
      console.log('action', action)
      return [...state, newItem]

    default:
      return state
  }
}
