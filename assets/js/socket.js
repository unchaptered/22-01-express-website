console.log("socket.js");
const className=[ "roomList_content", "roomList_column" ];
const roomLists=document.querySelector(".chat-displayer");

const socket=io.connect("http://localhost:4000/rooms", {
    path: "/socket.io"
})

socket.on("newRoom", (data)=>{
    const { roomid, roomtitle, roompw, roommax, username, createdDate }=data;

    const roomList_content=document.createElement("div");
    roomList_content.className=className[0];
    roomList_content.dataset.id=roomid;
    const roomList_title=document.createElement("div");
    roomList_title
        .appendChild(document.createElement("span").textContent="제목");
    roomList_title
        .appendChild(document.createElement("span").textContent=`${roomtitle}`);

    const roomList_password=document.createElement("div");
    roomList_password
        .appendChild(document.createElement("span").textContent="비밀번호");
    roomList_password
        .appendChild(document.createElement("span").textContent=`${roompw}`);

    const roomList_max=document.createElement("div");
    roomList_max
        .appendChild(document.createElement("span").textContent="인원수 제한");
    roomList_max
        .appendChild(document.createElement("span").textContent=`${roommax}`);
    
    const roomList_owner=document.createElement("div");
    roomList_owner
        .appendChild(document.createElement("span").textContent="생성자");
    roomList_owner
        .appendChild(document.createElement("span").textContent=`${username}`);
    

    const roomList_created=document.createElement("div");
    roomList_created
        .appendChild(document.createElement("span").textContent="생성일자");
    roomList_created
        .appendChild(document.createElement("span").textContent=`${createdDate}`);

    const roomlist_button=document.createElement("button");
    roomlist_button.href=`/rooms/${roomid}`;
    roomlist_button.dataset.roompw=roompw;

    roomList_content.appendChild(roomList_title.className=className[1]);
    roomList_content.appendChild(roomList_password.className=className[1]);
    roomList_content.appendChild(roomList_max.className=className[1]);
    roomList_content.appendChild(roomList_owner.className=className[1]);
    roomList_content.appendChild(roomList_created.className=className[1]);
    roomList_content.appendChild(roomlist_button.className);
});

socket.on("removeRoom", (data)=>{
    roomLists.querySelectorAll(".roomList_content0").forEach((div)=>{
        if (div.dataset.id===data) {
            div.parentNode.removeChild(div);
        }
    });
})

function chatButtonEvent(event) {
    if(event.target.dataset.password==="true") {
        const password=prompt("비밀번호를 입력하세요");
        location.href=`/rooms/${e.target.dataset.id}?password=${password}`;
    } else {
        location.href=`/rooms/${e.target.dataset.id}`;
    }
}