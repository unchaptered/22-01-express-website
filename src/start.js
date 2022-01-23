import "dotenv/config";
import "./db.js";

import APP from "./app.js";

APP.listen(process.env.PORT,()=>console.log("✅ success"));
