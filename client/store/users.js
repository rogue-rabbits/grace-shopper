import axios from 'axios'
import history from '../history'
import {getCartThunk, getItemsThunk} from '.'
import {runInNewContext} from 'vm'

const GOT_USERS = 'GOT_USERS'
export const DELETE_USER = 'DELETE_USER'

const gotUsers = users => ({type: GOT_USERS, users})
const deleteUserByAdmin = userId => ({type: DELETE_USER, userId})

export const getUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(gotUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deletingUser = userId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${userId}`)
      dispatch(deleteUserByAdmin(userId))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function usersReducer(users = [], action) {
  switch (action.type) {
    case GOT_USERS:
      return [...action.users]
    case DELETE_USER:
      const remainingUsers = users.filter(user => user.id !== action.userId)
      return remainingUsers
    default:
      return users
  }
}
