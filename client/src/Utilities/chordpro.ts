import ChordSheetJS from "chordsheetjs";

function parseChords(text: string) {
	const parser = new ChordSheetJS.ChordProParser();
	const song = parser.parse(text);
	return song;
}

function displayChords(song: ChordSheetJS.Song) {
	const formatter = new ChordSheetJS.TextFormatter();
	const disp = formatter.format(song);
	return disp;
}

function processChords(text: string) {
	const song = parseChords(text);
	const disp = displayChords(song);
	return disp;
}

export default processChords;
