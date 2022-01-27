import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";

const userSchema=new mongoose.Schema({
    nickname: { type:String, required:true },
    userid: { type:String, required:true, unique:true },
    userpw: { type:String, required:true },
})

userSchema.pre("save", async function() {
    if(this.isModified("userpw")) {
        this.password=await bcrypt.hash(this.password, process.env.BCRYPT_HASH_COUND);
    }
});

const userModel=mongoose.model("User", userSchema);

export default userModel;