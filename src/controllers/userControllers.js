import bcrypt from "bcrypt";
import dayjs from "dayjs";
import userModel from "../model/userModel.js";

import { idLength, idRegex, passwordCompared, passwordLength, passwordRegex } from "./modules/validator.js";

export const getJoin=(req, res)=>{
    return res.render("screens/join.pug");
}
export const postJoin=async(req, res)=>{
    const { username, userId, password, password2 }=req.body;
    
    const userExists=await userModel.findOne({ userid:userId });
    if(userExists) {
        req.flash("error", "이미 존재하는 이이디 입니다.");
        return res.status(304).redirect("/users/join");
    }
    
    if(!idLength(userId)){
        req.flash("error", "7자 초과 20자 미만의 아이디를 입력해주세요.");
        return res.status(304).redirect("/users/join");
    }
    if(!idRegex(userId)) {
        req.flash("error", "아이디에 한글이 포함되면 안됩니다.");
        return res.status(304).redirect("/users/join");
    }
    if(!passwordCompared(password,password2)) {
        req.flash("error", "두 비밀번호가 서로 같지 않습니다.");
        return res.status(304).redirect("/users/join");
    }
    if(!passwordLength(password)) {
        req.flash("error", "7자 초과 20자 미만의 비밀번호를 입력해주세요.");
        return res.status(304).redirect("/users/join");
    }
    if(!passwordRegex(password)) {
        req.flash("error", "비밀번호에 특수문자를 포함하여야 합니다.");
        return res.status(304).redirect("/users/join");
    }

    const usercreated=dayjs().format('YYYY:MM:DD:HH:mm:ss');

    const userDB=await userModel.create({ 
        username,
        userid:userId,
        userpw:password,
        usercreated
    });

    req.flash("data", userId);
    return res.redirect("/users/login");
}
export const getLogin=(req, res)=>{
    return res.render("screens/login.pug");
}
export const postLogin=async(req, res)=>{
    const { userId, password }=req.body;

    if(!idLength(userId)){
        req.flash("error", "7자 초과 20자 미만의 아이디를 입력해주세요.");
        return res.status(304).redirect("/users/login");
    }
    if(!idRegex(userId)) {
        req.flash("error", "아이디에 한글이 포함되면 안됩니다.");
        return res.status(304).redirect("/users/login");
    }
    if(!passwordLength(password)) {
        req.flash("error", "7자 초과 20자 미만의 비밀번호를 입력해주세요.");
        return res.status(304).redirect("/users/login");
    }
    if(!passwordRegex(password)) {
        req.flash("error", "비밀번호에 특수문자를 포함하여야 합니다.");
        return res.status(304).redirect("/users/login");
    }

    const userDB=await userModel.findOne({ userid:userId });    
    if (userDB===null) {
        req.flash("error", "존재하지 않는 이이디 입니다.");
        return res.status(404).redirect("/users/login");
    }

    const isSameBothPassword=await bcrypt.compare(password, userDB.userpw);
    if (!isSameBothPassword) {
        req.flash("error", "일치하지 않는 비밀번호 입니다.");
        return res.status(304).redirect("/users/login");
    }

    req.session.loggedIn=true;
    req.session.user=userDB;
    return res.status(200).redirect("/");
}
export const getLogout=(req, res)=>{
    req.session.destroy();
    
    return res.status(200).redirect("/");
}
export const getProfile=async(req, res)=>{
    const { id }=req.params;

    const userDB=await userModel.findById({ _id:id });

    const userObj={
        _id:userDB._id,
        userid:userDB.userid,
        username:userDB.username,
        usercreated:userDB.usercreated
    };
    
    return res.render("screens/profile.pug", { userDB:userObj });
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
            req.flash("error", "닉네임, 아이디가 동일합니다.");
            return res.status(304).redirect(`/users/${id}`);
        }
        req.flash("error", "아이디가 동일합니다.");
        return res.status(304).redirect(`/users/${id}`);
    } else {
        if(userId===sessionUserid) {
            req.flash("error", "닉네임이 동일합니다.");
            return res.status(304).redirect(`/users/${id}`);
        }
    }

    if(!idLength(userId)) {
        req.flash("error", "7자 초과 20자 미만의 아이디를 입력해주세요.");
        return res.status(304).redirect(`/users/${id}`);
    }
    if(!idRegex(userId)) {
        req.flash("error", "아이디에 한글이 포함되면 안됩니다.");
        return res.status(304).redirect(`/users/${id}`);
    }

    const userExists=await userModel.findOne({ userid:userId });
    if(userExists) {
        req.flash("error", "이미 존재하는 이이디 입니다.");
        return res.status(304).redirect(`/users/${id}`);
    }

    const userDB=await userModel.findById({ _id:id });
    userDB.userid=userId;
    userDB.username=username;
    userDB.save();
    req.session.user=userDB;

    return res.status(200).redirect(`/users/${id}`);
}
export const getSearch=(req, res)=>{
    return res.render("screens/search.pug");
}
export const postSearch=(req, res)=>{
    return res.render("screens/search.pug");
}