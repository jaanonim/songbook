import {
    Center,
    Container,
    HStack,
    Heading,
    PinInput,
    PinInputField,
    Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./ScreenCode.css";

function ScreenCode() {
    const navigate = useNavigate();

    return (
        <div id="container">
            <Container as="main">
                <Center>
                    <Stack spacing={5}>
                        <Center>
                            <Heading as="h1" size="2xl">
                                Screen
                            </Heading>
                        </Center>
                        <Center>
                            <Heading as="h3" size="md">
                                Enter code:
                            </Heading>
                        </Center>
                        <Center>
                            <HStack>
                                <PinInput
                                    type="alphanumeric"
                                    size="lg"
                                    otp
                                    variant="filled"
                                    onComplete={(value) => {
                                        navigate(
                                            `/screen/${value.toUpperCase()}`
                                        );
                                    }}
                                >
                                    <PinInputField textTransform="capitalize" />
                                    <PinInputField textTransform="capitalize" />
                                    <PinInputField textTransform="capitalize" />
                                    <PinInputField textTransform="capitalize" />
                                    <PinInputField textTransform="capitalize" />
                                    <PinInputField textTransform="capitalize" />
                                </PinInput>
                            </HStack>
                        </Center>
                    </Stack>
                </Center>
            </Container>
        </div>
    );
}

export default ScreenCode;
