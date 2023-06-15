import { HStack } from "@chakra-ui/react";
import React from "react";

interface TopRightCornerProps {
    children: React.ReactNode;
    zIndex?: string;
}

function TopRightCorner(props: TopRightCornerProps) {
    return (
        <HStack
            spacing={2}
            zIndex={props.zIndex}
            m={2}
            style={{ top: 0, right: 0, position: "fixed" }}
        >
            {props.children}
        </HStack>
    );
}

export default TopRightCorner;
