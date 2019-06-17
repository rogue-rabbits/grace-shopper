import axios from 'axios'
import {REMOVE_USER} from './user'

// Action Type
const GET_ORDER = 'GET_ORDER'
const ADD_ORDER = 'ADD_ORDER'
const UPDATE_LAST_ORDER = 'UPDATE_LAST_ORDER'

//Action Creators
const getOrder = order => ({type: GET_ORDER, order})
const addOrder = order => ({type: ADD_ORDER, order})
export const updateLastOrder = order => ({type: UPDATE_LAST_ORDER, order})

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

export function getLastOrderThunk() {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orderHistory/lastOrder')
      dispatch(updateLastOrder(data[0].orderNumber))
    } catch (err) {
      console.log('error in orderHistory thunk')
    }
  }
}

//Reducer
const initialState = {allOrders: [], lastOrderNum: 0}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {...state, allOrders: action.order}
    case ADD_ORDER:
      return {...state, allOrders: [...state.allOrders, action.order]}
    case UPDATE_LAST_ORDER:
      return {...state, lastOrderNum: action.order}
    case REMOVE_USER:
      return []
    default:
      return state
  }
}
