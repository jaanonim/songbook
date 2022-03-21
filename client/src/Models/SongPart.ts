import PartType from "./PartTypes";

export default interface SongPart {
	id: number;
	type: PartType;
	lirycs: string;
}
