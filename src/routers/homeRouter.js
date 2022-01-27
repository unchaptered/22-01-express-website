import express from "express";
import { getHome } from "../controllers/homeControllers.js";
import { getJoin, getLogin, postJoin, postLogin, getSearch, postSearch } from "../controllers/userControllers.js";

const HOME_ROUTER=express.Router();

HOME_ROUTER.route("/").get(getHome);
HOME_ROUTER.route("/join").get(getJoin).post(postJoin);
HOME_ROUTER.route("/login").get(getLogin).post(postLogin);
HOME_ROUTER.route("/search").get(getSearch).post(postSearch);


export default HOME_ROUTER;