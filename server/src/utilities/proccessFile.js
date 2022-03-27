const {
    openlyricsParse,
    openlyricsCheck
} = require('./fileProccessors/openlyrics');
const fs = require('fs');

class ProccessFile {
    TYPES = {
        "openlyrics": {
            parser: openlyricsParse,
            checker: openlyricsCheck
        }
    }

    constructor(file, type) {
        this.file = file;
        this.text = fs.readFileSync(file.path, 'utf8');
        this.type = type;
    }

    async checkType() {
        for (const [key, value] of Object.entries(this.TYPES)) {
            if (value.checker(this.file, this.text)) {
                this.type = key;
                return true;
            }
        }
        return false
    }

    async proccessFile() {
        if (!this.type) {
            if (!await this.checkType()) {
                return {
                    error: "File type not supported"
                }
            }
        }
        const value = this.TYPES[this.type].parser(this.file, this.text);
        fs.unlinkSync(this.file.path);
        return value;
    }
}

module.exports = ProccessFile;
