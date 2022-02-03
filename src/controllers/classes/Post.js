import dayjs from "dayjs";
/** Post 는 postModel 에 대응되는 클래스입니다.
 */
class Post {
    _id;
    posttitle;
    posttext;
    createdDate;
    ownerId;
    /**Post Class
     * 
     * 유효성 검사 지문을 통과하지 못하면, throw Error
     * 
     * postTitleLength(title) 1<*<=50
     * 
     * postTextLength(text) 1<*<=1000
     * @param {*} title 게시글 제목
     * @param {*} text 게시글 내용
     */
    constructor (title,text) {
        if (!Post.postTitleLength(title)) throw new TypeError(`title ${title.length} (title>1 && title<=50)`);
        if (!Post.postTextLength(text)) throw new TypeError(`text ${text.length} (text>1 && text<=3000)`);

        this.posttitle=title;
        this.posttext=text;
    }

    /**게시글 제목 유효성 검사 1<*<=50
     * @param {*} title 
     * @returns true or false
     */
    static postTitleLength(title) {
        const result=title.length>1 && title.length<=50;
        return result;
    }
    /**게시글 내용 유효성 검사 1<*<=1000
     * @param {*} text 
     * @returns treu or false
     */
    static postTextLength(text) {
        const result=text.length>1 && text.length<=1000;
        return result;
    }

    set setPostId(id) {
        this._id=id;
    }
    set setPosttitle(title) {
        this.posttitle=title;
    }
    set setPosttext(text) {
        this.posttext=text;
    }
    set setOwnerId(_id) {
        this.ownerId=_id;
    }
    set setCreatedDate(date) {
        this.createdDate=date;
    }

    get getPostId() {
        return this._id;
    }
    get getPosttitle() {
        return this.posttitle;
    }
    get getPosttext() {
        return this.posttext;
    }
    get getCreatedDate() {
        return this.createdDate;
    }
    get getOwnerId() {
        return this.ownerId;
    }
    get getCreatedDate() {
        return this.createdDate;
    }
}

export default Post;