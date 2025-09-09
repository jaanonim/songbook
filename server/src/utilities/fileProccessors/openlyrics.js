const parseString = require("xml2js").parseStringPromise;
const { create } = require("xmlbuilder2");
const zl = require("zip-lib");
const fs = require("fs");
const { cleanCache, cachePath } = require("../cache");

const TYPES = {
  c: "chorus",
  b: "bridge",
  v: "verse",
};

function checkeType(text) {
  for (const key in TYPES) {
    if (text[0] == key) {
      return TYPES[key];
    }
  }
  return "verse";
}

function typeToLetter(type) {
  for (const key in TYPES) {
    if (TYPES[key] == type) {
      return key;
    }
  }
  return "v";
}

function getStr(obj) {
  const isString = (value) =>
    typeof value === "string" || value instanceof String;
  if (isString(obj)) {
    return obj;
  }
  return obj._;
}

async function parse(file, text) {
  text = text.replaceAll("<br/>", "\n");
  let data = await parseString(text);
  let title = getStr(data.song.properties[0].titles[0].title[0]);
  let author = getStr(data.song.properties[0].authors[0].author[0]);
  let lyrics = [];
  data.song.lyrics[0].verse.forEach(function (item, index) {
    item.lines = item.lines.map((ele) => {
      if (typeof ele !== "string") return ele._;
      else return ele;
    });
    lyrics.push({
      id: index,
      type: checkeType(item.$.name),
      text: item.lines.join("\n"),
    });
  });
  return [
    {
      title: title,
      author: author.trim(),
      parts: lyrics,
      tags: [],
      other: "",
    },
  ];
}

async function check(file, text) {
  try {
    await parseString(text);
  } catch (e) {
    return false;
  }
  return (
    text.indexOf('xmlns="http://openlyrics.info/namespace/2009/song"') !== -1
  );
}

async function exports(songs) {
  cleanCache();
  for (const song of songs) {
    let parts = [];
    let types = {};
    song.parts.forEach((part) => {
      let orginalText = part.text.split(/\n/);
      const txt = [];
      for (let i = 0; i < orginalText.length; i++) {
        txt.push(orginalText[i]);
        if (i < orginalText.length - 1) {
          txt.push({
            br: {},
          });
        }
      }
      if (types[part.type]) {
        types[part.type]++;
      } else {
        types[part.type] = 1;
      }
      parts.push({
        "@name": typeToLetter(part.type) + types[part.type],
        lines: {
          "#": txt,
        },
      });
    });
    const obj = {
      song: {
        "@xmlns": "http://openlyrics.info/namespace/2009/song",
        "@version": "0.8",
        "@createdIn": "OpenLP 2.4.6",
        properties: {
          titles: {
            title: song.title,
          },
          authors: {
            author: song.author,
          },
        },
        lyrics: {
          verse: parts,
        },
      },
    };
    const doc = create(obj);
    const xml = doc.end();
    let path = cachePath + `/${song.title} ${song.author}.xml`;
    let i = 0;
    while (fs.existsSync(path)) {
      path = cachePath + `/${song.title} ${song.author}_${i}.xml`;
      i++;
    }
    fs.writeFileSync(path, xml);
  }
  const path = `./static/exports/openlyrics_${Date.now()}.zip`;
  await zl.archiveFolder(cachePath, path);
  cleanCache();
  return path;
}

module.exports = {
  parse: parse,
  check: check,
  exports: exports,
};
