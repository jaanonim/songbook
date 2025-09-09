const { jsPDF } = require("jspdf");
const { parseCP } = require("simplechordpro");
require("./Roboto")();

function limitLength(text, maxLength = 30) {
  return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
}

class Document {
  constructor() {
    this.pageWidth = 8.3;
    this.pageHeight = 11.7;
    this.lineHeight = 1.2;
    this.margin = 0.5;
    this.maxLineWidth = this.pageWidth - this.margin * 3;
    this.maxLineHeight = this.pageHeight - this.margin * 2;
    this.fontSize = 10;
    this.ptsPerInch = 72;
    this.oneLineHeight = (this.fontSize * this.lineHeight) / this.ptsPerInch;
    this.doc = new jsPDF({
      unit: "in",
      format: [this.pageWidth, this.pageHeight],
      lineHeight: this.lineHeight,
    }).setProperties({ title: "Songbook" });
    this.x = 0;
    this.y = 0;
  }

  moveToNextPage() {
    if (this.x == 0) {
      this.x = 1;
      this.y = 0;
    } else {
      this.doc.addPage();
      this.x = 0;
      this.y = 0;
    }
  }

  setPage() {
    if (this.x == 0) {
      this.x = 1;
      this.y = 0;
    } else {
      this.doc.setPage(++this.doc.internal.getCurrentPageInfo().pageNumber);
      this.x = 0;
      this.y = 0;
    }
  }

  getY(lines) {
    return (lines * this.fontSize * this.lineHeight) / this.ptsPerInch;
  }

  textToLines(text) {
    return this.doc.splitTextToSize(text, this.maxLineWidth / 2);
  }

  addText(text, type = "normal") {
    this.doc.setFont("Roboto", type).setFontSize(this.fontSize);
    let textLines = this.textToLines(text);

    if (this.getY(textLines.length) + this.y > this.maxLineHeight) {
      this.moveToNextPage();
    }
    this.doc.text(
      textLines,
      this.margin + (this.x * (this.maxLineWidth + this.margin)) / 2,
      this.margin + 2 * this.oneLineHeight + this.y
    );
    this.moveByLines(textLines.length);
  }

  addLink(text, data, type = "normal", next = moveToNextPage) {
    this.doc.setFont("Roboto", type).setFontSize(this.fontSize);
    let textLines = this.textToLines(text);

    if (this.getY(textLines.length) + this.y > this.maxLineHeight) {
      next();
    }
    this.doc.textWithLink(
      textLines,
      this.margin + (this.x * (this.maxLineWidth + this.margin)) / 2,
      this.margin + 2 * this.oneLineHeight + this.y,
      data
    );
    this.moveByLines(textLines.length);
  }

  moveByLines(lines) {
    if (this.y > this.maxLineHeight) {
      this.moveToNextPage();
    }
    this.y += this.getY(lines);
  }

  resetToPage(page) {
    this.doc.setPage(page);
    this.y = 0;
    this.x = 0;
  }
}

module.exports = class SongBook {
  constructor(data) {
    this.doc = new Document();
    this.indexes = [];
    this.data = data;
    this.create();
  }

  calcSize(song) {
    let size = this.doc.textToLines(song.title).length;
    song.parts.forEach((part) => {
      if (part.type !== "verse") size++;
      size += this.doc.textToLines(parseCP(part.text)).length + 1;
    });
    size += 1;
    return this.doc.getY(size);
  }

  addPart(part) {
    if (part.type !== "verse") {
      this.doc.addText(part.type.toUpperCase() + ":", "italic");
    }
    this.doc.textToLines(part.text).forEach((line) => {
      const parsed = parseCP(line);
      const pList = this.doc.textToLines(parsed);
      if (parsed.length !== line.length && pList.length > 1) {
        const chrods = pList[0];
        let i = 0;
        while (i < chrods.length) {
          if (chrods[i] !== " ") {
            let txt = "";
            let p = i;
            while (chrods[i] !== " " && i < chrods.length) {
              txt += chrods[i];
              i++;
            }
            this.doc.doc
              .setFont("Roboto", "bold")
              .setFontSize(this.doc.fontSize);
            this.doc.doc.text(
              txt,
              this.doc.margin +
                this.doc.doc.getTextWidth(pList[1].slice(0, p)) +
                (this.doc.x * (this.doc.maxLineWidth + this.doc.margin)) / 2,
              this.doc.margin + 2 * this.doc.oneLineHeight + this.doc.y
            );
          } else {
            i++;
          }
        }
        this.doc.moveByLines(1);
        this.doc.addText(pList[1]);
      } else {
        this.doc.addText(parsed);
      }
    });

    this.doc.moveByLines(1);
  }

  addSong(song) {
    let size = this.calcSize(song);

    if (size <= this.doc.maxLineHeight) {
      if (size + this.doc.y > this.doc.maxLineHeight) {
        this.doc.moveToNextPage();
      }
    } else {
      if (this.doc.x === 1) {
        this.doc.moveToNextPage();
      }
    }

    this.doc.addText(song.title, "bold");
    this.indexes.push({
      title: song.title,
      page: this.doc.doc.internal.getCurrentPageInfo().pageNumber,
      top: this.doc.margin + this.doc.y,
    });
    this.doc.moveByLines(1);
    song.parts.forEach((part) => {
      this.addPart(part);
    });
    this.doc.moveByLines(1);
  }

  titlePage() {
    this.doc.doc.setFontSize(this.doc.fontSize * 3);
    this.doc.doc.setFont("Roboto", "bold");
    this.doc.doc.text(
      `Songbook`,
      this.doc.margin + this.doc.maxLineWidth / 2,
      this.doc.margin * 3,
      null,
      null,
      "center"
    );
    this.doc.doc.setFontSize(this.doc.fontSize);
    this.doc.doc.setFont("Roboto", "normal");
    this.doc.doc.text(
      "Generated using SongBook.",
      this.doc.margin + this.doc.maxLineWidth / 2,
      this.doc.maxLineHeight,
      null,
      null,
      "center"
    );
    this.doc.doc.addPage();
  }

  pageCountForIndex(songs) {
    let h = Math.ceil(this.doc.getY(songs.length) / 2);
    return Math.floor(h / this.doc.maxLineHeight) + 1;
  }

  create() {
    // Prepare data
    this.prepareData();

    // Create title page
    this.titlePage();

    // Create index pages
    for (let i = 0; i < this.pageCountForIndex(this.data); i++) {
      this.doc.doc.addPage();
    }

    // Create song pages
    this.data.forEach((element) => {
      this.addSong(element);
    });

    // Go back to index page
    this.doc.resetToPage(2);

    // Create index
    this.indexes.forEach((element) => {
      this.doc.addLink(
        limitLength(element.title),
        { pageNumber: element.page, top: element.top },
        "bold",
        () => {
          this.doc.setPage();
        }
      );
    });
  }

  prepareData() {
    this.data.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    this.data.forEach(
      (ele, i) => (ele.title = i + 1 + ". " + ele.title.toUpperCase())
    );
  }

  save(path) {
    this.doc.doc.save(path);
  }
};
