import { Input } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface BackgroundPickerTextInputProps {
    value: string;
    onSubmit: (value: string) => void;
}

export function BackgroundPickerTextInput(
    props: BackgroundPickerTextInputProps
) {
    const [value, setValue] = useState(props.value);
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    const submitInput = useCallback(() => {
        if (value !== "") props.onSubmit(value);
    }, [value]);

    return (
        <form
            style={{
                width: "50%",
            }}
            onSubmit={(e) => {
                e.preventDefault();
                ref.current?.blur();
            }}
        >
            <Input
                ref={ref}
                w="100%"
                value={value}
                onChange={(e) => {
                    setValue(e.currentTarget.value);
                }}
                onBlur={() => {
                    submitInput();
                }}
            />
        </form>
    );
}
