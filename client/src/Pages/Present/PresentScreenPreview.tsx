import CurrentSong from "../../Components/CurrentSong";
import ScreenData from "../../Models/ScreenData";
import Song from "../../Models/Song";

interface PresentScreenPreviewProps {
    previousSong?: () => void;
    nextSong?: () => void;
    addSong?: (song: Song, callback: (id: any) => void) => void;
    setHighlighted?: (song: number) => void;
    song: Song | null;
    previewScreen: ScreenData | null;
    w: string;
    h: string;
    visible: boolean;
}

export function PresentScreenPreview(props: PresentScreenPreviewProps) {
    return (
        <CurrentSong
            w={props.w}
            h={props.h}
            visible={props.visible}
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
