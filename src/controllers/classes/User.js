class User {
    username;
    userid;
    userpw;
    createdDate;
    static pwRegexPattern = new RegExp(/\W{1,}/);
    static idRegexPattern = new RegExp(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,}/g);
    /**User Constructor 내부에서 days(
     * @param {*} username 유저 닉네임
     * @param {*} userid 유저 아이디
     * @param {*} userpw 유저 비밀번호
     */
    constructor (username="",userid,userpw,userpw2) {
        if(!User.idLength(userid)) throw TypeError("7자 초과 20자 미만의 아이디를 입력해주세요.");
        if(!User.idRegex(userid)) throw TypeError("아이디에 한글이 포함되면 안됩니다.");
        
        if(!User.passwordCompared(userpw,userpw2)) throw TypeError("두 비밀번호가 서로 같지 않습니다.");
        if(!User.passwordLength(userpw)) throw TypeError("7자 초과 20자 미만의 비밀번호를 입력해주세요.");
        if(!User.passwordRegex(userpw)) throw TypeError("비밀번호에 특수문자를 포함하여야 합니다.");
        
        this.username=username;
        this.userid=userid;
        this.userpw=userpw;
    }

    /**아이디는 6자리 초과 30자리 이하
     * @param {*} id 
     * @returns true or false
     */
    static idLength(id) {
        const result=id.length>6 && id.length<=20;
        return result;
    }
    /**아이디에 한글 포함시 false 리턴, 아닐 시 true 리턴
     * @param {*} id 
     */
    static idRegex(id) {
        const result=!User.idRegexPattern.test(id);
        console.log(result);
        return result;
    }

    /**입력한 비밀번호가 동일해야함
     * @param {*} password 비밀번호
     * @param {*} password2 비밀번호 확인
     * @returns true or false
     */
    static passwordCompared(password,password2) {
        return password===password2;
    }
    /**비밀번호는 8자리 초과 20자리 이하
     * @param {*} password 
     * @returns true or false
     */
    static passwordLength(password) {
        return password.length>6 && password.length<=20;
    }
    /**비밀번호는 특수문자를 1개 이상 보유
     * @param {*} password 
     * @returns true or false
     */
    static passwordRegex(password) {
        return User.pwRegexPattern.test(password);
    }

    set setUsername(username) {
        this.username=username;
    }
    set setUserid(userid) {
        this.userid=userid;
    }
    set setUserpw(userpw) {
        this.userpw=userpw;
    }
    set setCreatedDate(createdDate) {
        this.createdDate=createdDate;
    }

    get getUsername() {
        return this.username;
    }
    get getUserid() {
        return this.userid;
    }
    get getUserpw() {
        return this.userpw;
    }
    get getCreatedDate() {
        return this.createdDate;
    }
}

export default User;