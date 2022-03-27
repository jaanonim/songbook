import { typeToDirective } from "../Utilities/chordpro";
import PartType from "./PartTypes";

interface SongPartInterface {
	id: number;
	type: PartType;
	text: string;
}

export default class SongPart implements SongPartInterface {
	id: number;
	type: PartType;
	text: string;

	constructor(songPart: any) {
		this.id = songPart.id;
		this.type = songPart.type;
		this.text = songPart.text;
	}

	toChordPro(): string {
		let chordPro = "";
		const ele = typeToDirective(this.type);
		chordPro += ele[0];
		chordPro += "\n";
		chordPro += this.text;
		chordPro += "\n";
		chordPro += ele[1];
		return chordPro;
	}
}
