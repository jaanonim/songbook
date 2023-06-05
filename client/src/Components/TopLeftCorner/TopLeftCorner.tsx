import { HStack } from "@chakra-ui/react";
import React from "react";

interface TopLeftCornerProps {
    children: React.ReactNode;
}

function TopLeftCorner(props: TopLeftCornerProps) {
    return (
        <HStack
            spacing={2}
            m={2}
            style={{ top: 0, left: 0, position: "fixed" }}
        >
            {props.children}
        </HStack>
    );
}

export default TopLeftCorner;
