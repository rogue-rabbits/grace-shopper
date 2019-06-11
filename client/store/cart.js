import axios from 'axios'

//Initial State
const initialState = {
  allItems: []
}

// Action Type
const GET_CART = 'GET_CART'

//Action Creators
const gotCart = items => ({type: GET_CART, items})

//Thunk Creators
export const getCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(gotCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

//Reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return [...action.products]
  }
}
