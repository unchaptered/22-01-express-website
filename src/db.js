import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const DB=mongoose.connection;

DB.on("error", ()=>console.log("❎ db failure")); // "on" can implement several times
DB.once("open", ()=>console.log("✅ db success")); // "once" can't implemtent once times