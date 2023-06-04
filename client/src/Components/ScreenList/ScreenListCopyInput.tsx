import { Box, Input, LinkOverlay, useToast } from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/react";

export function ScreenListCopyInput() {
    const toast = useToast();
    // const { onCopy, value, setValue, hasCopied } = useClipboard("");

    return (
        <Box
            onClick={() => {
                console.log("eee");
                toast({
                    title: `Copied to clipboard`,
                    status: "success",
                });
            }}
        >
            <Input
                disabled
                value={"B35DE3"}
                w="11ch"
                className="input-copy"
            ></Input>
        </Box>
    );
}
