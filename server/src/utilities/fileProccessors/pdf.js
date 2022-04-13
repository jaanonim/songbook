const fs = require("fs");
const PdfTools = require("../pdfTools");

async function exports(songs) {
	const path = `./static/exports/pdf_${Date.now()}.pdf`;
	new PdfTools(songs).save(path);

	return path;
}

async function parse(file, text) {
	throw new Error("Not implemented");
}

async function check(file, text) {
	return false;
}

module.exports = {
	check,
	exports,
	parse,
};
