import mongoose from "mongoose";

const roomSchema=new mongoose.Schema({
    roomtitle: { type:String, required:true },
    roommax: { type:Number, required:true },
    roompw: { type:String },
    ownerId: { type: mongoose.Schema.Types.ObjectId, requried: true, ref: "User" },
    createdDate: { type:String, required:true  }
});

const roomModel=mongoose.model("Room", roomSchema);

export default roomModel;