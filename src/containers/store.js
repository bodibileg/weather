import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './weatherSlice'

const store = configureStore({ reducer: weatherReducer })

console.log(store.getState())

export default store;