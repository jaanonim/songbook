const END_OF_SONG = ["new_song", "ns"];

const DATA = {
	title: ["title", "t"],
	author: ["artist", "composer", "lyricist"],
};

const SECTIONS_INFO = {
	start: ["start_of_", "so"],
	end: ["end_of_", "eo"],
};

const SECTIONS = {
	verse: ["verse", "v"],
	chorus: ["chorus", "c"],
	bridge: ["bridge", "b"],
	prechorus: ["prechorus", "p"],
	intro: ["intro", "i"],
	outro: ["outro", "o"],
};

module.exports = {
	END_OF_SONG,
	DATA,
	SECTIONS_INFO,
	SECTIONS,
};
