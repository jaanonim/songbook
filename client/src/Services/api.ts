import config from "../Config/config";
import processRequest from "../Utilities/api";
import ProcessSearchstring from "../Utilities/search";

async function getSongs(args: any) {
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

async function importSong(file: any, tags: string[]) {
	let data = new FormData();
	tags.forEach((tag) => data.append("tags", tag));
	data.append("file", file);
	const url = `${config.apiUrl}/song/import`;
	return processRequest(url, {
		method: "PUT",
		body: data,
	});
}

export { getSongs, delSong, createSong, updateSong, getSong, importSong };
