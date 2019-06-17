import axios from 'axios'

// Action Type
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const EMPTY_CART = 'EMPTY_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'

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

const addToGuestCart = items => ({
  type: ADD_TO_GUEST_CART,
  items
})

export const emptyCart = () => ({type: EMPTY_CART})
const deleteItem = productId => ({type: DELETE_ITEM, productId})

//Thunk Creators
export function addingToGuestCart(productId, quantity) {
  return async dispatch => {
    try {
      let {data} = await axios.post(`/api/guestcart/add-to-cart/`, {
        id: productId,
        quantity: quantity
      })
      console.log('data ', data)
      dispatch(addToGuestCart(data.products))
    } catch (err) {
      console.log(err)
    }
  }
}
export function updatingQuantityOfGuestCart(productId, quantity) {
  return async dispatch => {
    try {
      let {data} = await axios.post(`/api/guestcart/update-quantity/`, {
        id: productId,
        quantity: quantity
      })
      console.log('data ', data)
      dispatch(addToGuestCart(data.products))
    } catch (err) {
      console.log(err)
    }
  }
}
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
      data.user = user.data
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
      const product = await axios.get(`/api/products/${data.productId}`)
      //attach product information to newCartItem
      data.product = product.data
      //get req.user from express
      const user = await axios.get('/api/user')
      //attach user information to newCartItem
      data.user = user.data
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

export function deletingItem(productId) {
  return async dispatch => {
    try {
      await axios.delete(`/api/cart/${productId}`)
      dispatch(deleteItem(productId))
    } catch (error) {
      console.log('Unable to delete cart item.')
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
      return state.map(
        el =>
          el.userId === action.item.userId &&
          el.productId === action.item.productId
            ? action.item
            : el
      )
    case DELETE_ITEM:
      let newState = state.filter(item => item.productId !== action.productId)
      return newState
    case EMPTY_CART:
      return []
    case ADD_TO_GUEST_CART:
      console.log('add to guest cart', ...Object.values(action.items))

      return [...Object.values(action.items)]
    default:
      return state
  }
}
