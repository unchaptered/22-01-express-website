import dayjs from "dayjs";
/** Post 는 postModel 에 대응되는 클래스입니다.
 */
class Post {
    posttitle;
    posttext;
    createdDate;
    ownerId;
    /**Post Contstructor 내부에서 dayjs().format('YYYY:MM:DD:HH:mm:ss');
     * @param {*} title 게시글 제목
     * @param {*} text 게시글 내용
     */
    constructor (title,text) {
        if (!Post.postTitleLength(title)) throw new TypeError(`title ${title.length} (title>1 && title<=50)`);
        if (!Post.postTextLength(text)) throw new TypeError(`text ${text.length} (text>1 && text<=3000)`);

        this.posttitle=title;
        this.posttext=text;
        this.createdDate=dayjs().format('YYYY:MM:DD:HH:mm:ss');
    }

    /**게시글 제목은 1자리 초과 50자리 이하
     * @param {*} title 
     * @returns true or false
     */
    static postTitleLength(title) {
        const result=title.length>1 && title.length<=50;
        return result;
    }
    /**게시글 내용은 1자리 초과 5000자리 이하
     * @param {*} text 
     * @returns treu or false
     */
    static postTextLength(text) {
        const result=text.length>1 && text.length<=1000;
        return result;
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
}

export default Post;