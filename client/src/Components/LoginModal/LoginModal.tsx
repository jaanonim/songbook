import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { firstUpper } from "../../Utilities/text";
function LoginModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn, user, login, logout } = useAuth();

    const emailValid = useMemo(
        () => email.length > 0 && email.includes("@") && email.includes("."),
        [email]
    );
    const passwordValid = useMemo(() => password.length >= 8, [password]);

    if (isLoggedIn()) {
        return (
            <>
                <Text>
                    Welcome {user?.username ? firstUpper(user.username) : ""}!
                </Text>
                <Button
                    onClick={() => {
                        logout();
                    }}
                >
                    Logout
                </Button>
            </>
        );
    }

    return (
        <>
            <Button
                onClick={() => {
                    onOpen();
                }}
            >
                Login
            </Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl
                            isRequired
                            isInvalid={!emailValid && email.length > 0}
                        >
                            <FormLabel>Email</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="email@mail.cool"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <FormErrorMessage>
                                Email is invalid.
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            mt={3}
                            isInvalid={!passwordValid && password.length > 0}
                        >
                            <FormLabel>Password</FormLabel>
                            <Input
                                placeholder="hard password"
                                value={password}
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        onClose();
                                        login({ email, password });
                                    }
                                }}
                            />
                            <FormErrorMessage>
                                Password is too short.
                            </FormErrorMessage>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>
                            Cancel
                        </Button>
                        <Button
                            isDisabled={!(emailValid && passwordValid)}
                            colorScheme="blue"
                            onClick={() => {
                                onClose();
                                login({ email, password });
                            }}
                        >
                            Login
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default LoginModal;
