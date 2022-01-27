import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";

import { idLength, idRegex, passwordCompared, passwordLength, passwordRegex } from "./modules/validator.js";

export const getJoin=(req, res)=>{
    return res.render("screens/join.pug");
}
export const postJoin=async(req, res)=>{
    const { nickname, userId, password, password2 }=req.body;
    
    const userExists=await userModel.findOne({ userid:userId });
    if(userExists) {
        req.flash("error", "이미 존재하는 이이디 입니다.");
        return res.status(304).redirect("/join");
    }
    
    if(!idLength(userId)){
        req.flash("error", "7자 초과 20자 미만의 아이디를 입력해주세요.");
        return res.status(304).redirect("/join");
    }
    if(!idRegex(userId)) {
        req.flash("error", "아이디에 한글이 포함되면 안됩니다.");
        return res.status(304).redirect("/join");
    }
    if(!passwordCompared(password,password2)) {
        req.flash("error", "두 비밀번호가 서로 같지 않습니다.");
        return res.status(304).redirect("/join");
    }
    if(!passwordLength(password)) {
        req.flash("error", "7자 초과 20자 미만의 비밀번호를 입력해주세요.");
        return res.status(304).redirect("/join");
    }
    if(!passwordRegex(password)) {
        req.flash("error", "비밀번호에 특수문자를 포함하여야 합니다.");
        return res.status(304).redirect("/join");
    }

    const userDB=await userModel.create({ 
        nickname,
        userid:userId,
        userpw:password
    });

    req.flash("data", userId);
    return res.redirect("/login");
}
export const getLogin=(req, res)=>{
    return res.render("screens/login.pug");
}
export const postLogin=async(req, res)=>{
    const { userId, password }=req.body;

    if(!idLength(userId)){
        req.flash("error", "7자 초과 20자 미만의 아이디를 입력해주세요.");
        return res.status(304).redirect("/login");
    }
    if(!idRegex(userId)) {
        req.flash("error", "아이디에 한글이 포함되면 안됩니다.");
        return res.status(304).redirect("/login");
    }
    if(!passwordLength(password)) {
        req.flash("error", "7자 초과 20자 미만의 비밀번호를 입력해주세요.");
        return res.status(304).redirect("/login");
    }
    if(!passwordRegex(password)) {
        req.flash("error", "비밀번호에 특수문자를 포함하여야 합니다.");
        return res.status(304).redirect("/login");
    }

    const userDB=await userModel.findOne({ userid:userId });    
    if (userDB===null) {
        req.flash("error", "존재하지 않는 이이디 입니다.");
        return res.status(404).redirect("/login");
    }

    const isSameBothPassword=await bcrypt.compare(password, userDB.userpw);
    if (!isSameBothPassword) {
        req.flash("error", "일치하지 않는 비밀번호 입니다.");
        return res.status(304).redirect("/login");
    }

    req.session.loggedIn=true;
    req.session.user=userDB;
    return res.status(200).redirect("/");
}
export const getLogout=(req, res)=>{
    req.session.destroy();
    
    return res.status(200).redirect("/");
}

export const getSearch=(req, res)=>{
    return res.render("screens/search.pug");
}
export const postSearch=(req, res)=>{
    return res.render("screens/search.pug");
}