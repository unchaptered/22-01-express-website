import mongoose from "mongoose";

const chatSchema=new mongoose.Schema({
    room: { type:mongoose.Schema.Types.ObjectId, required:true, ref: "Room" },
    user: { type:mongoose.Schema.Types.ObjectId, required:true, ref: "User" },
    
    chat: { type:String },
    gif: { type:String },
    createdDate: { type:Date, default:Date.now }
});

const chatModel=mongoose.model("Chat", chatSchema);

export default chatModel;