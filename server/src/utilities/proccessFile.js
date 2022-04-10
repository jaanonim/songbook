const openlyrics = require("./fileProccessors/openlyrics");
const buildin = require("./fileProccessors/buildin");
const chordpro = require("./fileProccessors/chordpro");
const fs = require("fs");

class ProccessFile {
	TYPES = {
		openlyrics,
		buildin,
		chordpro,
	};

	constructor(file, type) {
		this.file = file;
		this.type = type;
	}

	async checkType() {
		for (const [key, value] of Object.entries(this.TYPES)) {
			if (!value.check) continue;
			if (await value.check(this.file, this.text)) {
				this.type = key;
				return true;
			}
		}
		return false;
	}

	async proccessFile() {
		this.text = fs.readFileSync(this.file.path, "utf8");
		if (!this.type) {
			if (!(await this.checkType())) {
				return {
					error: "File type not supported",
				};
			}
		}
		console.log(this.type);
		const value = this.TYPES[this.type].parse(this.file, this.text);
		fs.unlinkSync(this.file.path);
		return value;
	}

	async exportSongs() {
		if (!this.type || !this.TYPES[this.type].exports) return null;
		return await this.TYPES[this.type].exports(this.file);
	}
}

module.exports = ProccessFile;
