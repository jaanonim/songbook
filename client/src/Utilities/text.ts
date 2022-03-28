function firstUpper(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

function limitLength(text: string, maxLength = 30): string {
	return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
}

export { firstUpper, limitLength };
