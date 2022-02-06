class Chat {
    room;
    user;
    chat;
    gif;
    createdDate;

    constructor (room,user,chat,gif,createdDate) {
        this.room=room;
        this.user=user;
        this.chat=chat;
        this.gif=gif;
        this.createdDate=createdDate;
    }

    set setRoom(room) {
        this.room=room;
    }
    set setUser(user) {
        this.user=user;
    }
    set setChat(chat) {
        this.chat=chat;
    }
    set setGif(gif) {
        this.gif=gif;
    }
    set setCreatedDate(createdDate) {
        this.createdDate=createdDate;
    }
    get getRoom() {
        return this.room;
    }
    get getUser() {
        return this.user;
    }
    get getChat() {
        return this.chat;
    }
    get getGif() {
        return this.gif;
    }
    get getCreatedDate() {
        return this.createdDate;
    }
}

export default Chat;