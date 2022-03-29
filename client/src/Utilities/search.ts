interface SearchData {
	q: string;
	tags: string | undefined;
}

export default function ProcessSearchstring(text: string): SearchData {
	let t = text.match(/\#\S+/g);
	text = text.replace(/\#\S+/g, "");
	let t2 = t?.map((x) => {
		return x.replace("#", "");
	});
	let tags = t2?.join(",");
	text = text.trim();

	return {
		q: text,
		tags,
	};
}
