import axios from 'axios'

//Initial State
// const initialState = {
//   allItems: []
// }

// Action Type
const GET_CART = 'GET_CART'

//Action Creators
const getCart = items => ({type: GET_CART, items})

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
const initialState = []
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      // console.log("action", action);
      return action.items
    default:
      return state
  }
}
