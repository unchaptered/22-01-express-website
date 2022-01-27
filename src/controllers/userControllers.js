import { idLength, idRegex, passwordCompared, passwordLength, passwordRegex } from "./modules/validator.js";
import userModel from "../model/userModel.js";

export const getJoin=(req, res)=>{
    return res.render("screens/join.pug");
}
export const postJoin=async(req, res)=>{
    const {
        nickname,
        userId,
        password,
        password2
    }=req.body;
    
    if(!idLength(userId)){
        console.log("id s so short");
        return res.status(404).redirect("/join");
    }
    if(!idRegex(userId)) {
        console.log("id can't have korean");
        return res.status(404).redirect("/join");
    }

    if(!passwordCompared(password,password2)) {
        console.log("password isn't same");
        return res.status(404).redirect("/join");
    }
    if(!passwordLength(password)) {
        console.log("password is so short");
        return res.status(404).redirect("/join");
    }
    if(!passwordRegex(password)) {
        console.log("password don't have @,!,$ ...");
        return res.status(404).redirect("/join");
    }
    
    const userExists=await userModel.findOne({ userid:userId });
    if(userExists) {
        console.log("that username is already exists");
        return res.status(404).redirect("/join");
    }

    let userDB=await userModel.create({ 
        nickname,
        userid:userId,
        userpw:password
    });
    console.log(userDB);

    return res.redirect("/");
}
export const getLogin=(req, res)=>{
    return res.render("screens/login.pug");
}
export const postLogin=(req, res)=>{
    const {
        userId,
        password
    }=req.body;

    if(!passwordLength(password)) return res.status(404).redirect("/login");
    if(!passwordRegex(password)) return res.status(404).redirect("/login");
    
    return res.redirect("/");
}
export const getSearch=(req, res)=>{
    return res.render("screens/search.pug");
}
export const postSearch=(req, res)=>{
    return res.render("screens/search.pug");
}