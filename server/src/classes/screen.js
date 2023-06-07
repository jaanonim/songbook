module.exports = class Screen {
    constructor(socket) {
        this.socket = socket;
    }

    sendData(data) {
        this.socket.emit("show", data);
    }

    onDrop() {
        this.socket.emit("kick", { message: "Room closed." });
        this.socket.disconnect();
    }
};
