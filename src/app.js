import "dotenv/config";

import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

const app=express();
const morganLoger=morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd()+"/src/views"); 

app.use(morganLoger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 7 * 24 * 3600 * 1000 },
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use("/assets", express.static("assets"));

export default app;