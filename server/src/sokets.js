const { Server } = require("socket.io");
const Room = require("./classes/room");

let io = null;
let ROOMS = [];

const initSockets = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        },
    });

    io.on("connection", async (socket) => {
        let roomCode = socket.handshake.query.code;
        let room;
        if (roomCode) {
            console.log("CONNECTED", "room:", roomCode);
            room = ROOMS.filter((r) => r.code == roomCode);
            if (room.length != 1) {
                console.log("ROOM NOT FOUND", roomCode);
                socket.emit("kick", {
                    message: "Room doesn't exist.",
                });
                socket.disconnect();
                return;
            }
            room = room[0];
            room.addScreen(socket);
        } else {
            console.log("CONNECTED", "New room");
            room = new Room(
                socket,
                ROOMS.map((ele) => ele.code)
            );
            ROOMS.push(room);
        }

        socket.join(roomCode);

        socket.on("show", (data) => {
            console.log("SHOW", JSON.stringify(data));
            room.setData(data, socket);
        });

        socket.on("kick", (data) => {
            console.log("KICK", JSON.stringify(data));
            room.kick(data, socket);
        });

        socket.on("screenSettings", (data) => {
            console.log("screenSettings", JSON.stringify(data));
            room.setScreenSettings(data, socket);
        });

        socket.on("screenInfo", (data) => {
            console.log("screenInfo", JSON.stringify(data));
            room.setScreenInfo(data, socket);
        });

        socket.on("disconnecting", () => {
            console.log("DISCONNECTING", socket.id);
            if (room.presenter.id === socket.id) {
                room.drop();
                ROOMS = ROOMS.filter((r) => r.code !== room.code);
            } else {
                room.removeScreen(socket);
            }
        });
    });
};

module.exports = { initSockets };
