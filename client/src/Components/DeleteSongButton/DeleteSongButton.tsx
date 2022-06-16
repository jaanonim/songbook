import useDeleteSong from "../../Hooks/useDeleteSong";
import Song from "../../Models/Song";
import DeleteButton from "../DeleteButton";

interface SongEditProps {
    song: Song;
    onDelete?: (song: Song) => void;
}

function DeleteSongButton(props: SongEditProps) {
    const del = useDeleteSong(props.song.title);

    return (
        <DeleteButton
            onClick={(e) => {
                e.stopPropagation();
                if (props.onDelete) props.onDelete(props.song);
                del.mutate({
                    id: props.song._id,
                });
                return true;
            }}
        />
    );
}

export default DeleteSongButton;
