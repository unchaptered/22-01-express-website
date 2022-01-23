import "dotenv/config";
import "./db.js";

import app from "./app.js";

app.listen(process.env.PORT,()=>console.log("✅ success"));
