import axios from "axios";
import SocketIO from "socket.io";
import "dotenv/config";

function WebSocket(SERVER, APP, SESSION_MIDDLEWARE) {
    const IO=SocketIO(SERVER, { path: '/socket.io' });

    const ROOM=IO.of("/rooms");
    const CHAT=IO.of("/chats");
    IO.use((socket, next)=>{
        SESSION_MIDDLEWARE(socket.request, socket.request.res, next);
    });

    IO.on("connection", (socket)=>{
        const req=socket.request;
        const ip=req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        
        console.log("새로운 클라이언트 접속!", ip, socket.id, req.ip);

        socket.on("error", (error)=> {
            console.log(error);
        });
        socket.on("reply", (data)=> {
            console.log(data);
        });
        socket.interval=setInterval(()=>{
            socket.emit("news", "Hello, Socket.io");
        },10*1000);
    });
    ROOM.on("connection", (socket)=>{
        console.log("room 네임 스페이스에 접속");
        socket.on("disconnect", ()=>{
            console.log("room 네임 스페이스 접속 해제");
        });
    });
    
    CHAT.on("connection", async (socket)=>{
        console.log("chat 네임 스페이스에 접속");
        
        const req=socket.reqeust;
        const { headers: { referer }}=req;
        const roomId=referer
            .split("/")[referer.split("/").length-1]
            .replace(/\?.+/, '');
        
        socket.join(roomId);
        socket.to(roomId).emit("join", {
            user: "system",
            chat: `${req.session.color} 님이 입장하셨습니다.`
        });
        socket.on("disconnection", ()=>{
            console.log("chat 네임스페이스 접속 해제");
        });
        socket.leave(roomId);

        const currentRoom=socket.adapter.rooms[roomId];
        const userCount=currentRoom ? currentRoom.length : 0;
        if (userCount===0) {
            try{
                await axios.delete(`http://localhost:${process.env.PORT}/rooms/${roomId}`);
            } catch (err) {
                console.log(err);
            }

            console.log("방 제거 요청 성공");
        } else {
            socket.to(roomId).emit("exit", {
                user: "system",
                chat: `${req.session.color} 님이 퇴장하셨습니다.`
            })
        }
    })
};

export default WebSocket;