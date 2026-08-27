import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["student","teacher","admin"],
        required:true
    }
},{
    timestamps:true
})

const manageUser=mongoose.model("User",userSchema)

export default manageUser