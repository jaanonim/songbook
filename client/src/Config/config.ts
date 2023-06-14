const environment = process.env.NODE_ENV;

const production = {
    apiUrl: "/api",
    socketUrl: `"https://https://songbook.onrender.com/"`,
};
const development = {
    apiUrl: "http://localhost:5000/api",
    socketUrl: "http://localhost:5000/",
};

export default environment === "production" ? production : development;
