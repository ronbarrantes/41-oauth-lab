import { combineReducers } from 'redux'
import token from './token.js'
import charity from './charity.js'
import clientProfile from './client-profile.js'
export default combineReducers({ token, charity, clientProfile })