const environment = process.env.NODE_ENV;
const base_url = process.env.BASE_URL;

const production = {
    apiUrl: "/api",
    socketUrl: `"ws://${base_url}/"`,
};
const development = {
    apiUrl: "http://localhost:5000/api",
    socketUrl: "http://localhost:5000/",
};

export default environment === "production" ? production : development;
