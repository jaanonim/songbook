import PartType from "../Models/PartTypes";
import SongPart from "../Models/SongPart";

function typeToDirective(type: PartType): [string, string] {
	switch (type) {
		case PartType.CHORUS:
			return ["{soc}", "{eoc}"];
		case PartType.BRIDGE:
			return ["{sob}", "{eob}"];
		case PartType.VERSE:
			return ["{sov}", "{eov}"];
		default:
			return ["", ""];
	}
}

function lexer(text: string) {
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
	return data;
}

const DATA = [
	{
		type: PartType.VERSE,
		start: "sov",
		end: "eov",
	},
	{
		type: PartType.CHORUS,
		start: "soc",
		end: "eoc",
	},
	{
		type: PartType.BRIDGE,
		start: "sob",
		end: "eob",
	},
	{
		type: PartType.VERSE,
		start: "start_of_verse",
		end: "end_of_verse",
	},
	{
		type: PartType.CHORUS,
		start: "start_of_chorus",
		end: "end_of_chorus",
	},
	{
		type: PartType.BRIDGE,
		start: "{start_of_bridge}",
		end: "{end_of_bridge}",
	},
];

function parse(text: string) {
	let data = lexer(text);

	let parts = [];
	let i = 0;
	let index = 0;
	while (i < data.length) {
		if (data[i][0] == "{") {
			text = data[i].slice(1, -1).trim();
			for (let j = 0; j < DATA.length; j++) {
				const element = DATA[j];
				if (text == element.start) {
					i++;
					parts.push(
						new SongPart({
							id: index,
							type: element.type,
							text: data[i].trim(),
						})
					);
					index++;
					break;
				}
			}
		}
		i++;
	}
	return parts;
}

export { typeToDirective, parse };
