import express from "express";
import { getHome } from "../controllers/homeControllers.js";
import { getJoin, getLogin, postJoin, postLogin, getLogout, getSearch, postSearch } from "../controllers/userControllers.js";
import { preventLoginUser, preventLogoutUser } from "../middleware.js";

const HOME_ROUTER=express.Router();

HOME_ROUTER.route("/").get(getHome);
HOME_ROUTER.route("/join").all(preventLoginUser).get(getJoin).post(postJoin);
HOME_ROUTER.route("/login").all(preventLoginUser).get(getLogin).post(postLogin);
HOME_ROUTER.route("/logout").all(preventLogoutUser).get(getLogout);
HOME_ROUTER.route("/search").get(getSearch).post(postSearch);


export default HOME_ROUTER;