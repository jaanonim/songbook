const environment = import.meta.env.PROD;

const production = {
    apiUrl: "/api",
    socketUrl: "/",
};
const development = {
    apiUrl: "http://localhost:5000/api",
    socketUrl: "http://localhost:5000/",
};

export default environment ? production : development;
