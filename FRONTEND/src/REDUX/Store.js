import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice.js"
import adminSlice from "./adminSlice.js"

const store = configureStore({
    reducer:{
        auth:authSlice,
        admin:adminSlice
    }
})

export default store