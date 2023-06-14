const environment = process.env.ENV;

const production = {
    apiUrl: "/api",
    socketUrl: `"https://${process.env.BASE_URL}/"`,
};
const development = {
    apiUrl: "http://localhost:5000/api",
    socketUrl: "http://localhost:5000/",
};

export default environment === "production" ? production : development;
