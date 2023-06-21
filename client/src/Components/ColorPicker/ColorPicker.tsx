import {
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    Center,
    PopoverBody,
    SimpleGrid,
    Input,
} from "@chakra-ui/react";
import { useState } from "react";
import "./ColorPicker.css";

interface ColorPickerProps {
    colors: string[];
    selectedColor?: string;
    onSelect?(value: string): void;
    mt?: string;
}

function ColorPicker(props: ColorPickerProps) {
    const [color, setColor] = useState(
        props.selectedColor === undefined ||
            props.selectedColor.trim().length <= 0
            ? props.colors[0]
            : props.selectedColor
    );

    const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleColorChange(e.target.value);
    };

    const handleColorChange = (color: string) => {
        setColor(color);
        if (typeof props.onSelect === "function") props.onSelect(color);
    };

    return (
        <>
            <Popover variant="picker">
                <PopoverTrigger>
                    <Button
                        mt={props.mt}
                        aria-label={color}
                        background={color}
                        _hover={{
                            borderWidth: "2px",
                            borderStyle: "solid",
                            borderColor: "blue.300",
                        }}
                        height="2rem"
                        width="2rem"
                        padding={0}
                        minWidth="unset"
                        borderRadius={3}
                    ></Button>
                </PopoverTrigger>
                <PopoverContent width="15rem" className={"noselect"}>
                    <PopoverArrow />
                    <PopoverHeader
                        height="3rem"
                        backgroundColor={color}
                        borderTopLeftRadius={5}
                        borderTopRightRadius={5}
                    >
                        <Center height="100%" className="invertColor">
                            {color}
                        </Center>
                    </PopoverHeader>
                    <PopoverBody minHeight="4rem">
                        <SimpleGrid columns={10} spacing={1}>
                            {props.colors.map((c) => (
                                <Button
                                    key={c}
                                    aria-label={c}
                                    background={c}
                                    height="1rem"
                                    width="1rem"
                                    padding={0}
                                    minWidth="unset"
                                    borderRadius={2}
                                    _hover={{ transform: "scale(1.2)" }}
                                    onClick={() => {
                                        handleColorChange(c);
                                    }}
                                ></Button>
                            ))}
                        </SimpleGrid>
                        <Input
                            borderRadius={3}
                            marginTop={3}
                            placeholder="black"
                            size="sm"
                            value={color}
                            onChange={handleColorInputChange}
                        />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default ColorPicker;
