import axios from 'axios'

// Action Type
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

//Action Creators
const getCart = items => ({type: GET_CART, items})
const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

//Thunk Creators
export function addingToCart(userId, itemId, quantity) {
  return async dispatch => {
    try {
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
      console.log('DATA ', data)
      dispatch(addToCart(data))
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
        product: action.item.product
      }
      let curr = [...state, newItem]
      console.log('STATE: ', curr)
      return [...state, newItem]

    default:
      return state
  }
}
