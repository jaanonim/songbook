import { Box, Input, useToast } from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/react";
import { RefObject, useEffect, useRef } from "react";

interface ScreenListCopyInputProps {
    value: string;
}

export function ScreenListCopyInput(props: ScreenListCopyInputProps) {
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
                w="11ch"
                className="input-copy"
            ></Input>
        </Box>
    );
}
