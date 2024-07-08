import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    image : {
        type : String
    },
    fromGoogle: {
        type: Boolean,
        default: false,
    },
    subscribers : {
        type : Number,
        default : 0
    },
    subscribedUsers : {
        type : [String],
    },
}, {timestamps : true})

export default mongoose.model("user", userSchema);