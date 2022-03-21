import SongPart from "./SongPart";

export default interface Song {
	_id: string;
	title: string;
	author: string;
	tags: string[];
	parts: [SongPart];
	other?: any;
}
