const { getRandomString } = require("../utilities/random");
const Screen = require("./screen");

module.exports = class Room {
    constructor(presenter) {
        this.code = getRandomString(6);
        this.data = {};
        this.screens = [];
        this.presenter = presenter;
        this.seedCode();
    }

    addScreen(socket) {
        const screen = new Screen(socket);
        this.screens.push(screen);
        screen.sendData(this.data);
        this.sendScreenConnected(screen);
    }

    removeScreen(socket) {
        const s = this.screens.filter((e) => {
            e.socket.id == socket.id;
        });
        this.screens = this.screens.filter((e) => {
            e.socket.id != socket.id;
        });
        this.sendScreenDisconnected(s);
    }

    seedCode() {
        this.presenter.emit("code", { code: this.code });
    }

    sendData() {
        this.screens.forEach((s) => {
            s.sendData(this.data);
        });
    }

    sendScreenConnected(screen) {
        this.presenter.emit("screen", { screen, status: "connect" });
    }

    sendScreenDisconnected(screen) {
        this.presenter.emit("screen", { screen, status: "disconnect" });
    }

    setData(data, socket) {
        if (socket.id !== this.presenter.id) {
            console.log("Not presenter");
            return;
        }
        this.data = data;
        this.sendData();
    }

    drop() {
        this.screens.forEach((s) => {
            s.onDrop();
        });
    }
};
