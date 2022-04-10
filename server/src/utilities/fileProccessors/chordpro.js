const fs = require("fs");
const ChordProTools = require("../chordProTools");

async function exports(songs) {
	const path = `./static/exports/chordpro_${Date.now()}.txt`;
	fs.writeFileSync(path, ChordProTools.fromData(songs));

	return path;
}

async function parse(file, text) {
	return ChordProTools.parse(text).map((song) => song.data);
}

async function check(file, text) {
	try {
		let tags = ChordProTools.lexer(text);
		if (tags.length < 2) return false;
		return ChordProTools.parse(text).some((ele) => ele.getData().title);
	} catch (e) {
		return false;
	}
}

module.exports = {
	check,
	exports,
	parse,
};
