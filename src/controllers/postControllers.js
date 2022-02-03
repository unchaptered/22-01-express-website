import Post from "./classes/Post.js.js"
import CustomDate from "./classes/CustomDate.js";

import postModel from "../model/postModel.js";
import dayjs from "dayjs";

export const getPostLists=async(req, res)=>{
    try {
        const postDBLists=(await postModel.find().limit(10))
        .map(({
            _id, posttitle, posttext, createdDate, ownerId
        })=>{
            
            posttext=(posttext.length>99) ? posttext.substring(0,99)+"..." : posttext;
            const post=new Post(posttitle, posttext);
            post.setPostId=_id;
            post.setCreatedDate=createdDate;
            post.setOwnerId=ownerId;
            return post;
        });

        return res.status(200).render("screens/post/postlist.pug", {postDBLists});
    } catch(error) {

        req.flash("error", error);
        return res.status(404).redirect("/");
    }
}

export const getAddPost=(req, res)=>{
    return res.render("screens/post/write.pug");
}
export const postAddPost=async(req, res)=> {
    const { 
        body: { posttitle, posttext },
        session: { user: { _id } }
    }=req;
    
    let postObj;
    try {
        postObj=new Post(posttitle, posttext);
        postObj.setOwnerId=_id;
        postObj.setCreatedDate=CustomDate.getCreatedDate();
        
        const postDB=await postModel.create({
            posttitle:postObj.getPosttitle,
            posttext:postObj.getPosttext,
            createdDate:postObj.getCreatedDate,
            ownerId:postObj.getOwnerId
        });

        req.flash("data", "게시글 작성이 완료되었습니다.");
        return res.status(200).redirect(`/posts/${postDB._id}`);
    } catch(error) {

        req.flash("error", error);
        return res.status(400).redirect("/");
    }
}

export const getSinglePost=async(req, res)=>{
    const { id }=req.params;

    try {
        const postDBtmp=await postModel.findById({ _id:id }).populate("ownerId");
        const postDB=new Post(postDBtmp.posttitle, postDBtmp.posttext);
        postDB.setPostId=postDBtmp._id;
        postDB.setOwnerId=postDBtmp.ownerId;
        postDB.setCreatedDate=postDBtmp.createdDate;
        return res.status(200).render("screens/post/postdetail.pug", { postDB });
    } catch(err) {
    
        return res.status(404).redirect("/posts/");
    }
}
export const postEditPost=async(req, res)=>{
    const {
        params:{
            id:_id
        },
        body: {
            posttitle,
            posttext
        }
    }=req;

    const post=new Post(posttitle, posttext);

    try {
        const postDB=await postModel.findById({_id});
        postDB.posttitle=post.getPosttitle;
        postDB.posttext=post.getPosttext;
        postDB.save();

        post.setPostId=_id;
        post.setCreatedDate=postDB.createdDate;
        post.setOwnerId=postDB.ownerId;
        
        req.flash("postDB", true);
        req.flash("_id", post.getPostId);
        req.flash("posttitle", post.getPosttitle);
        req.flash("posttext", post.getPosttext);
    } catch (err) {
        req.flash("error", "수정 중에 서버 문제가 발생했습니다. 재접속을 권고드립니다.");
    }
    return res.redirect(`/posts/${_id}`);
}

export const getPostRemove=async(req, res)=>{
    const { id:_id }=req.params;
    
    try {
        await postModel.findByIdAndRemove({ _id });
    } catch(err) {
        req.flash("error",err);

    }
    return res.redirect("/");
}