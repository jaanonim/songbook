import { NotAllowedIcon } from "@chakra-ui/icons";
import {
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Spacer,
    Td,
    Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ScreenDataNotNull } from "../../Models/ScreenData";
import { socket } from "../../Services/socket";
import DeleteButton from "../DeleteButton";
import ScreenSettingsModal from "../ScreenSettingsModal/ScreenSettingsModal";

interface ScreenListElementProps {
    data: ScreenDataNotNull;
}

export function ScreenListElement(props: ScreenListElementProps) {
    const [value, setValue] = useState(props.data.settings.name);
    const [valueLast, setValueLast] = useState(props.data.settings.name);
    useEffect(() => {
        setValue(props.data.settings.name);
        setValueLast(props.data.settings.name);
    }, [props.data.settings]);

    return (
        <Tr key={props.data.socket}>
            <Td>
                <Flex>
                    <Editable
                        value={value}
                        onChange={(v) => {
                            setValue(v);
                        }}
                        onSubmit={(v) => {
                            setValueLast(v);
                            props.data.settings.name = v;
                            socket.emit("screenSettings", props.data.settings);
                        }}
                        onCancel={() => {
                            setValue(valueLast);
                        }}
                    >
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    <Spacer></Spacer>
                    <ScreenSettingsModal data={props.data} />
                    <DeleteButton
                        icon={<NotAllowedIcon />}
                        onClick={() => {
                            socket.emit("kick", {
                                id: props.data.socket,
                            });
                            return false;
                        }}
                    ></DeleteButton>
                </Flex>
            </Td>
        </Tr>
    );
}
