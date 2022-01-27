import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema({
    username: { type:String, required:true },
    userid: { type:String, required:true, unique:true },
    userpw: { type:String, required:true },
    usercreated:  { type:Date, required:true, default:Date.now },
})

userSchema.pre("save", async function() {
    if(this.isModified("userpw")) {
        this.userpw=await bcrypt.hash(this.userpw, 5);
    }
});

const userModel=mongoose.model("User", userSchema);

export default userModel;