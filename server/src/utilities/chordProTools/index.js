const ChordProSong = require("./chordProSong");
const D = require("./data");

class ChordProTools {
	static lexer(text) {
		let data = [];
		let current = "";
		let i = 0;
		while (true) {
			if (text[i] === "{") {
				if (current.length > 0) {
					data.push(current);
					current = "";
				}

				while (text[i] !== "}") {
					current += text[i];
					i++;
				}
				current += text[i];
				i++;
				data.push(current);
				current = "";
			} else {
				current += text[i];
				i++;
			}
			if (i >= text.length) {
				if (current != undefined && current.length > 0) {
					data.push(current);
				}
				break;
			}
		}
		data = data.map((e) => e.trim());
		return data.filter((e) => e != undefined && e.length > 0);
	}

	static parse(text) {
		const tags = this.lexer(text);
		let songs = [];
		let song = [];
		for (let i = 0; i < tags.length; i++) {
			if (tags[i][0] === "{") {
				let tag = tags[i].slice(1, tags[i].length - 1).trim();
				if (D.END_OF_SONG.some((e) => e === tag)) {
					if (song.length > 0) {
						songs.push(song);
					}
					song = [];
					continue;
				}
			}
			song.push(tags[i]);
		}
		if (song.length > 0) {
			songs.push(song);
		}
		return songs.map((song) => new ChordProSong(song));
	}

	static fromRaw(data) {
		if (!Array.isArray(data)) data = [data];
		return data
			.map((song) => {
				let list = [];
				list = list.concat(
					song.data.map((item) => ({ ...item, info: "data" }))
				);
				list = list.concat(
					song.parts.map((item) => ({ ...item, info: "parts" }))
				);
				list = list.concat(
					song.other.map((item) => ({ ...item, info: "other" }))
				);
				list = list.sort((a, b) => a.tags[0] - b.tags[0]);

				let result = "";
				for (let i = 0; i < list.length; i++) {
					let line = list[i];
					if (line.info === "other") {
						result += line.value + "\n";
					} else if (line.info === "parts") {
						let start = `{${
							line.type.length > 2
								? D.SECTIONS_INFO.start[0]
								: D.SECTIONS_INFO.start[1]
						}${line.type}}`;
						let end = `{${
							line.type.length > 2
								? D.SECTIONS_INFO.end[0]
								: D.SECTIONS_INFO.end[1]
						}${line.type}}`;
						result += start + "\n" + line.text + end + "\n\n";
					} else if (line.info === "data") {
						result += "{" + line.type + ": " + line.value + "}\n\n";
					}
				}
				return result;
			})
			.join(`\n{${D.END_OF_SONG[0]}}\n\n`);
	}

	static fromData(data, index = 0) {
		if (!Array.isArray(data)) data = [data];
		return data
			.map((song) => {
				let result = "";
				if (song.title)
					result += `{${D.DATA.title[index]}: ${song.title}}\n\n`;
				if (song.author)
					result += `{${D.DATA.author[index]}:${song.author}}\n\n`;
				if (song.parts)
					result += `${song.parts
						.map(
							(part) =>
								`{${D.SECTIONS_INFO.start[index]}${
									D.SECTIONS[part.type]
										? D.SECTIONS[part.type][index]
										: part.type
								}}\n${part.text}\n{${
									D.SECTIONS_INFO.end[index]
								}${
									D.SECTIONS[part.type]
										? D.SECTIONS[part.type][index]
										: part.type
								}}`
						)
						.join("\n\n")}\n\n`;
				if (song.other) result += `${song.other}\n`;
				return result;
			})
			.join(`\n{${D.END_OF_SONG[index]}}\n\n`);
	}
}

module.exports = ChordProTools;
