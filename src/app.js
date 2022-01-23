import express from "express";
import morgan from "morgan";

const app=express();
const morganLoger=morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd()+"/src/views"); 

app.use(morganLoger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/assets", express.static("assets"));

export default app;