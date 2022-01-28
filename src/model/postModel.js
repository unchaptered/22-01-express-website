import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    postname: { type:String, required:true },
    posttext: { type:String, required:true},
    createdDate:  { type:Object, required:true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, requried: true, ref: "User" },
});

const postModel=mongoose.model("Post", postSchema);

export default postModel;