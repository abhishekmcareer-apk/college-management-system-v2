import { createSlice } from "@reduxjs/toolkit"

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        adminDashBoardData:null,
        teachersList:null
    },
    reducers:{
        setAdminDashBoardData:(state,action)=>{
            state.adminDashBoardData=action.payload
        },

        setTeachersList:(state,action)=>{
            state.teacherList=action.payload
        },

        clearAdminDashBoardData:(state)=>{
            state.adminDashBoardData=null
        }
    }
})

export const {setAdminDashBoardData,clearAdminDashBoardData,setTeachersList}=adminSlice.actions
export default adminSlice.reducer