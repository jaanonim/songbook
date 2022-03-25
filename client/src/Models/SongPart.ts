import { typeToDirective } from "../Utilities/chordpro";
import PartType from "./PartTypes";

interface SongPartInterface {
	id: number;
	type: PartType;
	lirycs: string;
}

export default class SongPart implements SongPartInterface {
	id: number;
	type: PartType;
	lirycs: string;

	constructor(songPart: any) {
		this.id = songPart.id;
		this.type = songPart.type;
		this.lirycs = songPart.lirycs;
	}

	toChordPro(): string {
		let chordPro = "";
		const ele = typeToDirective(this.type);
		chordPro += ele[0];
		chordPro += "\n";
		chordPro += this.lirycs;
		chordPro += "\n";
		chordPro += ele[1];
		return chordPro;
	}
}
