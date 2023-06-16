const environment = import.meta.env.PROD;

const production = {
    apiUrl: "/api",
    socketUrl: "/",
    reactQueryDevtools: false,
};
const development = {
    apiUrl: "http://localhost:5000/api",
    socketUrl: "http://localhost:5000/",
    reactQueryDevtools: true,
};

export default environment ? production : development;
