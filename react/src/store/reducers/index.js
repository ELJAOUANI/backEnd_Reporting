import {combineReducers} from '@reduxjs/toolkit'
import reportReducer from './report/reportSlice'
import authReducer from './auth/authSlice'
import technicienReducer from './technicien/technicienSlice'
import cityReducer from './cities/citySlice'


export const rootReducer = combineReducers({
    report:reportReducer,
    auth:authReducer,
    technicien:technicienReducer,
    city:cityReducer
})