export default function processRequest(
	url: string,
	args?: any,
	isBlob = false
) {
	return fetch(url, args)
		.then(async (res) => {
			let data;
			if (isBlob) {
				data = await res.blob();
			} else {
				const isJson = res.headers
					.get("content-type")
					?.includes("application/json");
				data = isJson ? await res.json() : null;
			}

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
