const fs = require('fs');

async function exports(songs) {
    let result = [];
    for (const song of songs) {
        result.push({
            title: song.title,
            author: song.author,
            tags: song.tags,
            parts: song.parts,
            other: song.other,
        });
    }
    console.log(fs.readdirSync("./"))
    const path = `./static/exports/buildin_${Date.now()}.json`
    fs.writeFileSync(path, JSON.stringify(result));

    return path;
}

async function parse(file, text) {
    return JSON.parse(text);
}

async function check(file, text) {
    try {
        JSON.parse(text);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = {
    check,
    exports,
    parse
}
