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
        this.sendScreen();
    }

    removeScreen(socket) {
        this.screens = this.screens.filter((e) => e.socket.id !== socket.id);
        this.sendScreen();
        if (this.screens.length > 0)
            this.sendScreenInfo(this.screens[0].screenInfo);
    }

    seedCode() {
        this.presenter.emit("code", { code: this.code });
    }

    sendData() {
        this.screens.forEach((s) => {
            s.sendData(this.data);
        });
    }

    sendScreen() {
        this.presenter.emit("screen", {
            screens: this.screens.map((s) => s.serialize()),
        });
    }

    setData(data, socket) {
        if (socket.id !== this.presenter.id) {
            console.log("Not presenter");
            return;
        }
        this.data = data;
        this.sendData();
    }

    setScreenInfo(data, socket) {
        const screen = this.screens.find((s) => s.socket.id === socket.id);
        screen.setScreenInfo(data);
        if (socket.id === this.screens[0]?.socket.id) {
            this.sendScreenInfo(data);
        }
    }

    sendScreenInfo(data) {
        this.presenter.emit("screenInfo", data);
    }

    drop() {
        this.screens.forEach((s) => {
            s.onDrop();
        });
    }
};
