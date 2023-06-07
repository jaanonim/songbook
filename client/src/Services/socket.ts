import { io } from "socket.io-client";
import config from "../Config/config";

// For screen
const getSocket = (query?: { [key: string]: string }) => {
    return io(config.socketUrl, {
        autoConnect: false,
        query: query,
    });
};

// For Presenter
const socket = io(config.socketUrl, {
    autoConnect: false,
});

export { getSocket, socket };
