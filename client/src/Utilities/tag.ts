function processTag(tag: string) {
	tag = tag.replace(/\s+/g, "-");
	return tag.replace(/#+/g, "");
}
export default processTag;
