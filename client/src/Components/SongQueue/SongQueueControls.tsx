import {
    CheckCircleIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from "@chakra-ui/icons";
import { Flex, IconButton, Spacer } from "@chakra-ui/react";
import DeleteButton from "../DeleteButton/DeleteButton";

export function SongQueueControls(props: any) {
    return (
        <Flex width="100%" mt="0.5rem" mb="0.5rem">
            <IconButton
                marginX={2}
                aria-label="move up"
                icon={<TriangleUpIcon></TriangleUpIcon>}
                isDisabled={props.isDisabled}
                onClick={props.onMoveUp}
            ></IconButton>
            <IconButton
                marginX={2}
                aria-label="move down"
                icon={<TriangleDownIcon></TriangleDownIcon>}
                onClick={props.onMoveDown}
                isDisabled={props.isDisabled}
            ></IconButton>
            <Spacer></Spacer>
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
        </Flex>
    );
}
