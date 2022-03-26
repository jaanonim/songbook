const environment = process.env.NODE_ENV;

const production = {
	apiUrl: "/api",
};
const development = {
	apiUrl: "http://localhost:5000/api",
};

export default environment === "production" ? production : development;
