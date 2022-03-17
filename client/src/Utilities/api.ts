export default function processRequest(url: string, args?: any) {
	return fetch(url, args)
		.then(async (res) => {
			const isJson = res.headers
				.get("content-type")
				?.includes("application/json");
			const data = isJson ? await res.json() : null;

			if (!res.ok) {
				const error = (data && data.message) || res.status;
				return Promise.reject(new Error(error));
			}

			return data;
		})
		.catch((error) => {
			throw error;
		});
}
