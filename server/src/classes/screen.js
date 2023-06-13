module.exports = class Screen {
    constructor(socket) {
        this.socket = socket;
        this.screenInfo = null;
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

    setScreenInfo(data) {
        this.screenInfo = data;
    }
};
