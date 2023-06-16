import { Box, Input, useClipboard, useToast } from "@chakra-ui/react";
import { RefObject, useEffect, useRef } from "react";
import "./CopyInput.css";

interface CopyInputProps {
    value: string;
}

function CopyInput(props: CopyInputProps) {
    const toast = useToast();
    const { onCopy, setValue } = useClipboard("");
    const ref = useRef(null) as RefObject<HTMLInputElement>;

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <Box
            onClick={() => {
                onCopy();
                ref.current?.focus();
                ref.current?.select();
                toast({
                    title: `Copied to clipboard`,
                    status: "success",
                });
            }}
        >
            <Input
                ref={ref}
                disabled
                value={props.value}
                w="13ch"
                textAlign="center"
                className="input-copy"
            ></Input>
        </Box>
    );
}

export default CopyInput;
