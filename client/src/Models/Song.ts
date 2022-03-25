import { parse } from "../Utilities/chordpro";
import SongPart from "./SongPart";

interface SongInterface {
	_id: string;
	title: string;
	author: string;
	tags: string[];
	parts: SongPart[];
	other: string;
}
export default class Song implements SongInterface {
	_id: string;
	title: string;
	author: string;
	tags: string[];
	parts: SongPart[];
	other: string;

	constructor(song: any) {
		this._id = song._id;
		this.title = song.title;
		this.author = song.author;
		this.tags = song.tags;
		this.parts = song.parts.map((part: any) => new SongPart(part));
		this.other = song.other;
	}

	partsToChrodPro(): string {
		return this.parts.map((e: SongPart) => e.toChordPro()).join("\n\n");
	}

	setPartsFromChrodPro(chordPro: string) {
		this.parts = parse(chordPro);
		return this.parts;
	}
}
