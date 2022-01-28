import express from "express";
import { getAddPost, getPostLists, getSinglePost, postAddPost, postEditPost } from "../controllers/postControllers.js";

const POST_ROUTER=express.Router();
POST_ROUTER.route("/").get(getPostLists);
POST_ROUTER.route("/add").get(getAddPost).post(postAddPost);
POST_ROUTER.route("/edit/:id").get(getSinglePost).post(postEditPost);

export default POST_ROUTER;