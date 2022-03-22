import config from "../Config/config";
import ProcessSearchstring from "../Utilities/search";
import processRequest from "../Utilities/api";

async function getAllSongs(args: any) {
	const search = args.queryKey[1];
	const page = args.pageParam || 0;
	let url = `${config.apiUrl}/song?page=${page}`;
	if (search) {
		const { q, tags } = ProcessSearchstring(search);
		url += q != null ? `&q=${q}` : "";
		url += tags != null ? `&tags=${tags}` : "";
	}
	return processRequest(url);
}

async function getSong(args: any) {
	const id = args.queryKey[1];
	return processRequest(`${config.apiUrl}/song/${id}`);
}

async function delSong(args: any) {
	const id = args.id;
	const url = `${config.apiUrl}/song/${id}`;
	return processRequest(url, {
		method: "DELETE",
	});
}

async function createSong(args: any) {
	const url = `${config.apiUrl}/song`;
	return processRequest(url, {
		method: "POST",
		body: JSON.stringify(args.song),
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function updateSong(args: any) {
	const id = args.id;
	const url = `${config.apiUrl}/song/${id}`;
	return processRequest(url, {
		method: "PATCH",
		body: JSON.stringify(args.song),
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export { getAllSongs as getSongs, delSong, createSong, updateSong, getSong };
