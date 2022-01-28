import express from "express";
import { getAddPost, getPostLists, getSinglePost, postAddPost, postEditPost } from "../controllers/postControllers.js";
import { preventLogoutUser, preventNonOwner } from "../middleware.js";

const POST_ROUTER=express.Router();
POST_ROUTER.route("/").get(getPostLists);
POST_ROUTER.route("/add").all(preventLogoutUser).get(getAddPost).post(postAddPost);
POST_ROUTER.route("/edit/:id").get(getSinglePost).all(preventNonOwner).post(postEditPost);

export default POST_ROUTER;