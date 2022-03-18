export default interface Song {
	_id: string;
	title: string;
	author: string;
	tags: string[];
	data?: {
		other: any;
		parts: [
			{
				id: number;
				name: string;
				lirycs: string;
			}
		];
	};
}
