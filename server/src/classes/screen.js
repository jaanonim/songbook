module.exports = class Screen {
    constructor(socket) {
        this.socket = socket;
        this.screenInfo = null;
        this.settings = null;
    }

    serialize() {
        return { socket: this.socket.id, settings: this.settings };
    }

    sendData(data) {
        this.socket.emit("show", data);
    }

    setSettings(data) {
        this.settings = data;
        this.sendScreenSetting();
    }

    sendScreenSetting() {
        this.socket.emit("screenSettings", this.settings);
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
