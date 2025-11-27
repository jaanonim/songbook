import {
    AbsoluteCenter,
    Center,
    Container,
    Flex,
    Heading,
    Stack,
} from "@chakra-ui/react";
import ColorModeButton from "../../Components/ColorModeButton";
import SelectionButton from "../../Components/SelectionButton";
import TopRightCorner from "../../Components/TopRightCorner";
import "./Selection.css";
import LoginModal from "../../Components/LoginModal";
import RegisterModal from "../../Components/RegisterModal";

function Selection() {
    return (
        <>
            <Container as="main" w="100vw" h="100vh">
                <AbsoluteCenter>
                    <Center>
                        <Stack spacing={5}>
                            <Center>
                                <Heading as="h1" size="2xl">
                                    SongBook
                                </Heading>
                            </Center>
                            <Center>
                                <Heading as="h2" size="md">
                                    Select what you will do:
                                </Heading>
                            </Center>
                        </Stack>
                    </Center>
                    <Center>
                        <Flex
                            flexWrap="wrap"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <SelectionButton
                                color="orange"
                                url="/manage"
                                title="Manage"
                                subtitle="Manage your songs"
                            ></SelectionButton>
                            <SelectionButton
                                color="blue"
                                url="/present"
                                title="Present"
                                subtitle="Present your songs"
                            ></SelectionButton>
                            <SelectionButton
                                color="green"
                                url="/screen"
                                title="Screen"
                                subtitle="Screen for presentation"
                            ></SelectionButton>
                        </Flex>
                    </Center>
                </AbsoluteCenter>
            </Container>
            <TopRightCorner>
                <RegisterModal />
                <LoginModal />
                <ColorModeButton />
            </TopRightCorner>
        </>
    );
}

export default Selection;
