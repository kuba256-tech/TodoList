import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:[true, "username is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    confirmPassword:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }
});

export const User = mongoose.model("User", userSchema);
