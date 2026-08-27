import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,
        isLogin: false
    },

    reducers: {

        loginSuccess: (state, action) => {
            state.user = action.payload,
                state.isLogin = true
        },

        logOut: (state) => {
            state.user = null,
                state.isLogin = false
        }
    }
})


export const { loginSuccess, logOut } = authSlice.actions
export default authSlice.reducer