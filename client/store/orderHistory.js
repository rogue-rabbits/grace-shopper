import axios from 'axios'

// Action Type
const GET_ORDER = 'GET_ORDER'
const ADD_ORDER = 'ADD_ORDER'

//Action Creators
const getOrder = order => ({type: GET_ORDER, order})
const addOrder = order => ({type: ADD_ORDER, order})

//Thunk Creators
export function getItemsThunk() {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orderHistory')
      dispatch(getOrder(data))
    } catch (err) {
      console.log('error in orderHistory thunk')
    }
  }
}

export function addItemsThunk(newItem) {
  return async dispatch => {
    try {
      console.log('new item: ', newItem)
      const {data} = await axios.post('/api/orderHistory', newItem)
      dispatch(addOrder(data))
    } catch (err) {
      console.log('error in orderHistory thunk')
    }
  }
}

//Reducer
const initialState = []
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case ADD_ORDER:
      return [...state, action.order]
    default:
      return state
  }
}
