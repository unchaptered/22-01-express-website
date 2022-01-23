import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const DB=mongoose.connection;

const accessFail=()=>console.log(`❎ db.js : Fail`);
const accessSuccess=()=>console.log(`✅ db.js : Success`);

DB.on("error", accessFail); // "on" can implement several times
DB.once("open", accessSuccess); // "once" can't implemtent once times