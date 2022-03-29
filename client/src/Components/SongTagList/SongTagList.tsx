import useUpdateSong from "../../Hooks/useUpdateSong";
import Song from "../../Models/Song";
import TagList from "../TagList";
interface SongTagListProps {
	song: Song;
}

function SongTagList(props: SongTagListProps) {
	const update = useUpdateSong(props.song.title);

	return (
		<TagList
			tags={props.song.tags}
			saveTags={(tags) => {
				update.mutate({
					id: props.song._id,
					song: {
						tags: tags,
					},
				});
			}}
		></TagList>
	);
}

export default SongTagList;
