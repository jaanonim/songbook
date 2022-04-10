const D = require("./data");

class ChordProSong {
	constructor(tags) {
		this.tags = tags;
		this.parse();
	}

	parse() {
		this.raw = this.getRaw();
		this.data = this.getData();
	}

	getRaw() {
		let data = [];
		let parts = [];
		let other = [];
		let i = 0;
		while (i < this.tags.length) {
			let element = this.tags[i];
			i++;
			if (element[0] === "{") {
				let tag = element.slice(1, element.length - 1).trim();
				let match = D.SECTIONS_INFO.start.filter((ele) =>
					tag.startsWith(ele)
				);
				if (match.length > 0) {
					const name = tag.split(match[0])[1].trim();
					let part = "";
					let elements = [];
					elements.push(i - 1);
					while (
						i < this.tags.length &&
						!D.SECTIONS_INFO.end.some((ele) =>
							this.tags[i].slice(1).startsWith(ele + name)
						)
					) {
						part += this.tags[i] + "\n";
						elements.push(i);
						i++;
					}
					elements.push(i);
					i++;
					parts.push({ type: name, text: part, tags: elements });
					continue;
				} else {
					const [key, value] = tag.split(":").map((e) => e.trim());
					data.push({ type: key, value, tags: [i - 1] });
				}
			} else {
				other.push({ value: element, tags: [i - 1] });
			}
		}
		return { data, parts, other };
	}

	getData() {
		if (!this.raw) {
			this.raw = this.getRaw();
		}

		const transformType = (type) => {
			for (const [key, value] of Object.entries(D.SECTIONS)) {
				if (value.some((ele) => ele === type)) {
					return key;
				}
			}
			return type;
		};

		const FindInD = (v, data) => {
			let res = "";
			D.DATA[v].forEach((ele) => {
				let b = data.data.filter((e) => e.type === ele)[0];
				if (b) res = b;
			});
			return res;
		};

		let t = [];
		let title = FindInD("title", this.raw);
		let author = FindInD("author", this.raw);
		let parts = this.raw.parts.map((part, index) => ({
			id: index,
			type: transformType(part.type),
			text: part.text,
			tags: part.tags,
		}));

		if (title) {
			t.push(...title.tags);
			title = title.value;
		}
		if (author) {
			t.push(...author.tags);
			author = author.value;
		}
		parts.map((ele) => {
			t.push(...ele.tags);
			delete ele.tags;
			return ele;
		});

		let other = "";
		if (this.tags.length !== t.length) {
			let j = 0;
			for (let i = 0; i < this.tags.length; i++) {
				if (t[j] === i) {
					j++;
				} else {
					other += this.tags[i] + "\n";
				}
			}
		}

		return {
			title,
			author,
			parts,
			other,
		};
	}
}

module.exports = ChordProSong;
