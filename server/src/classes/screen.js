module.exports = class Screen {
    constructor(socket) {
        this.socket = socket;
    }

    serialize() {
        return { socket: this.socket.id };
    }

    sendData(data) {
        this.socket.emit("show", data);
    }

    onDrop() {
        this.socket.emit("kick", { message: "Room closed." });
        this.socket.disconnect();
    }
};
