const parseString = require('xml2js').parseStringPromise;

function checkeType(text) {
    if (text[0] === 'c') {
        return 'chorus';
    }
    if (text[0] === 'b') {
        return 'bridge';
    }
    return 'verse';
}

async function parse(file, text) {
    text = text.replaceAll("<br/>", "\n");
    let data = await parseString(text);
    let title = data.song.properties[0].titles[0].title[0];
    let author = data.song.properties[0].authors[0].author[0];
    let lyrics = [];
    data.song.lyrics[0].verse.forEach(function (item, index) {
        item.lines = item.lines.map((ele) => {
            if (typeof (ele) !== 'string')
                return ele._;
            else
                return ele;
        })
        lyrics.push({
            id: index,
            type: checkeType(item.$.name),
            text: item.lines.join("\n")
        })
    })
    return [{
        title: title,
        author: author.trim(),
        parts: lyrics,
        tags: [],
        other: "",
    }]
}

async function check(file, text) {
    try {
        await parseString(text);
    } catch (e) {
        return false;
    }
    return text.indexOf('xmlns="http://openlyrics.info/namespace/2009/song"') != -1;
}


module.exports = {
    parse: parse,
    check: check
}
