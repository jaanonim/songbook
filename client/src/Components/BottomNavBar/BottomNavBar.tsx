import { Box } from "@chakra-ui/react";
import {
    BottomNavigation,
    BottomNavigationIcon,
    BottomNavigationItem,
    BottomNavigationLabel,
} from "chakra-ui-bottom-navigation";

interface BottomNavBarProps {
    onChange: (value: string | number) => void;
    value: string | number;
    elements: { icon: any; name: string }[];
}

function BottomNavBar(props: BottomNavBarProps) {
    return (
        <Box>
            <BottomNavigation
                borderTopWidth={1}
                value={props.value}
                onChange={props.onChange}
                position="fixed"
                bottom="0"
                left="0"
                h="4rem"
                backgroundColor="var(--chakra-colors-chakra-body-bg)"
                w="100vw"
                display="flex"
                justifyContent="space-evenly"
            >
                {props.elements.map((e, i) => (
                    <BottomNavigationItem
                        key={i}
                        _hover={{
                            backgroundColor: "rgba(99, 179, 237,0.1)",
                        }}
                        margin="0.3rem"
                        w="20%"
                        borderRadius={10}
                    >
                        <BottomNavigationIcon as={e.icon} />
                        <BottomNavigationLabel>{e.name}</BottomNavigationLabel>
                    </BottomNavigationItem>
                ))}
            </BottomNavigation>
        </Box>
    );
}

export default BottomNavBar;
