import { CheckCircleIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import DeleteButton from "../DeleteButton/DeleteButton";

interface SongQueueControlsProps {
    isDisabled: boolean;
    onSelect?: () => void;
    onDelete?: (e: any) => boolean;
}

export function SongQueueControls(props: SongQueueControlsProps) {
    return (
        <>
            <IconButton
                marginX={2}
                aria-label="select"
                icon={<CheckCircleIcon></CheckCircleIcon>}
                onClick={props.onSelect}
                isDisabled={props.isDisabled}
            ></IconButton>
            <DeleteButton
                size="md"
                marginX="2"
                isDisabled={props.isDisabled}
                onClick={props.onDelete}
            ></DeleteButton>
        </>
    );
}
