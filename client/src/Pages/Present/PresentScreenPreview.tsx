import CurrentSong from "../../Components/CurrentSong";
import Song from "../../Models/Song";
import ScreenData from "../../Models/ScreenData";

interface PresentScreenPreviewProps {
    previousSong?: () => void;
    nextSong?: () => void;
    addSong?: (song: Song, callback: (id: any) => void) => void;
    setHighlighted?: (song: number) => void;
    song: Song | null;
    previewScreen: ScreenData | null;
}

export function PresentScreenPreview(props: PresentScreenPreviewProps) {
    return (
        <CurrentSong
            song={props.song}
            screen={props.previewScreen}
            onQueueElement={(item) => {
                if (props.setHighlighted) props.setHighlighted(item.id);
            }}
            onSongDragged={(song) => {
                if (props.addSong)
                    props.addSong(song, (id) => {
                        if (props.setHighlighted) props.setHighlighted(id);
                    });
            }}
            onNextSong={() => {
                if (props.nextSong) props.nextSong();
            }}
            onPreviousSong={() => {
                if (props.previousSong) props.previousSong();
            }}
        />
    );
}
