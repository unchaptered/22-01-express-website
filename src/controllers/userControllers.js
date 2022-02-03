import bcrypt from "bcrypt";
import { logger } from "../../config/winston.js";
import userModel from "../model/userModel.js";

import User from "./classes/User.js";
import CustomDate from "./classes/CustomDate.js";

export const getJoin=(req, res)=>{
    logger.info(`⭕ getJoin ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.render("screens/user/join.pug");
}
export const postJoin=async(req, res)=>{
    const { username, userId, password, password2 }=req.body;

    const userExists=await userModel.findOne({ userid:userId });
    if(userExists) {
        logger.error(`❌ postJoin ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / user is already exists`);
        req.flash("error", "이미 존재하는 이이디 입니다.");
        return res.status(304).redirect("/users/join");
    }

    let user;
    try {
        user=new User(username,userId,password,password);
        user.setCreatedDate=CustomDate.getCreatedDate();
    } catch(err) {
        logger.error(`❌ postJoin ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / ${err}`);
        req.flash("error", err);
        return res.status(304).redirect("/users/join");
    }

    try {
        const userDB=await userModel.create({ 
            username:user.getUsername,
            userid:user.getUserid,
            userpw:user.getUserpw,
            createdDate:user.getCreatedDate
        });
    } catch(err) {
        logger.error(`❌ postJoin ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / ${err}`);
        req.flash("error", err);
        return res.status(304).redirect("/users/join");
    }

    logger.info(`⭕ postJoin ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    req.flash("data", userId);
    return res.redirect("/users/login");
}
export const getLogin=(req, res)=>{
    logger.info(`⭕ getLogin ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.render("screens/user/login.pug");
}
export const postLogin=async(req, res)=>{
    const { userId, password }=req.body;

    try {
        const user=new User("",userId,password,password);
    } catch(err) {
        logger.error(`❌ postJoin ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / ${error}`);
        req.flash("error", err);
        return res.status(304).redirect("/users/login");
    }

    const userDB=await userModel.findOne({ userid:userId });    
    if (userDB===null) {
        logger.error(`❌ postJoin ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / user is not exists`);
        req.flash("error", "존재하지 않는 이이디 입니다.");
        return res.status(404).redirect("/users/login");
    }

    const isSameBothPassword=await bcrypt.compare(password, userDB.userpw);
    if (!isSameBothPassword) {
        logger.error(`❌ postJoin ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / password is not same`);
        req.flash("error", "일치하지 않는 비밀번호 입니다.");
        return res.status(304).redirect("/users/login");
    }

    req.session.loggedIn=true;
    req.session.user=userDB;
    logger.info(`⭕ postLogin ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.status(200).redirect("/");
}
export const getLogout=(req, res)=>{
    logger.info(`⭕ getLogout ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    req.session.destroy();
    
    return res.status(200).redirect("/");
}
export const getProfile=async(req, res)=>{
    const { id }=req.params;


    const userDB=await userModel.findById({ _id:id });
    if (userDB===null) {
        logger.error(`❌ getProfile ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / user is not exists`);
        return res.status(404).redirect("/");
    }

    const userObj={
        _id:userDB._id,
        userid:userDB.userid,
        username:userDB.username,
        createdDate:userDB.createdDate
    };
    
    logger.info(`⭕ getProfile ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.render("screens/user/profile.pug", { userDB:userObj });
}
export const postProfile=async(req,res)=>{
    const {
        body: { username, userId },
        params: { id },
        session: {
            user: { username:sessionUsername, userid:sessionUserid }
        }
    }=req;

    if(username===sessionUsername) {
        if(userId===sessionUserid) {
            logger.error(`❌ postProfile ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / username, userid is same`);
            req.flash("error", "닉네임, 아이디가 동일합니다.");
            return res.status(304).redirect(`/users/${id}`);
        }logger.error(`❌ postProfile ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / userid is same`);
        req.flash("error", "아이디가 동일합니다.");
        return res.status(304).redirect(`/users/${id}`);
    } else {
        if(userId===sessionUserid) {
            logger.error(`❌ postProfile ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / username is same`);
            req.flash("error", "닉네임이 동일합니다.");
            return res.status(304).redirect(`/users/${id}`);
        }
    }

    if(!User.idLength(userId)) {
        logger.error(`❌ postProfile ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / userid ins't 7<*<=20`);
        req.flash("error", "7자 초과 20자 미만의 아이디를 입력해주세요.");
        return res.status(304).redirect(`/users/${id}`);
    }
    if(!User.idRegex(userId)) {
        logger.error(`❌ postProfile ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / userid can't allow 한글`);
        req.flash("error", "아이디에 한글이 포함되면 안됩니다.");
        return res.status(304).redirect(`/users/${id}`);
    }

    const userExists=await userModel.findOne({ userid:userId });
    if(userExists) {
        logger.error(`❌ postProfile ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / user is already exists`);
        req.flash("error", "이미 존재하는 이이디 입니다.");
        return res.status(304).redirect(`/users/${id}`);
    }

    const userDB=await userModel.findById({ _id:id });
    if(!userDB) {
        logger.error(`❌ postProfile ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / user isn't exists`);
        return res.status(404).redirect(`/users/${id}`);
    }
    userDB.userid=userId;
    userDB.username=username;
    userDB.save();
    req.session.user=userDB;

    logger.info(`⭕ postProfile ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.status(200).redirect(`/users/${id}`);
}
export const getUserLists=async(req, res)=>{
    const userDBLists=await userModel.find().limit(10);
    if(!userDBLists) {
        logger.error(`❌ userDBLists ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / user isn't exists`);
        return res.status(404).redirect(`/users/${id}`);
    }

    logger.info(`⭕ userDBLists ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.render("screens/user/userList.pug", {userDBLists});
}
export const getUserRemove=async(req, res)=>{
    const { _id }=req.session.user;

    let userDB;
    try{
        userDB=await userModel.findByIdAndRemove({_id});
    } catch (err) {
        logger.error(`❌ getUserRemove ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / ${err}`);
        return res.status(404).redirect("/");
    }
    req.session.destroy();

    logger.info(`⭕ getUserRemove ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.status(200).redirect("/");
}
export const getSearch=(req, res)=>{
    logger.info(`⭕ getSearch ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.render("screens/user/search.pug");
}
export const postSearch=(req, res)=>{
    logger.info(`⭕ postSearch ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.render("screens/user/search.pug");
}