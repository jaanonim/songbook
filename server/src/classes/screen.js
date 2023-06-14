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

    onKick() {
        this.socket.emit("kick", { message: "Disconnected by presenter." });
        this.socket.disconnect();
    }

    onDrop() {
        this.socket.emit("kick", { message: "Room closed." });
        this.socket.disconnect();
    }

    setScreenInfo(data) {
        this.screenInfo = data;
    }
};
