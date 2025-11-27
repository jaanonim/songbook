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
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { register } from "../../Services/api";

function RegisterModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordC, setPasswordC] = useState("");
    const { isLoggedIn } = useAuth();
    const toast = useToast();

    const emailValid = useMemo(
        () => email.length > 0 && email.includes("@") && email.includes("."),
        [email]
    );
    const passwordValid = useMemo(() => password.length >= 8, [password]);
    const passwordsMatch = useMemo(
        () => password === passwordC,
        [password, passwordC]
    );
    const usernameValid = useMemo(() => username.length >= 3, [username]);

    if (isLoggedIn()) {
        return <></>;
    }
    return (
        <>
            <Button
                onClick={() => {
                    onOpen();
                }}
            >
                Register
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
                            isInvalid={!usernameValid && username.length > 0}
                        >
                            <FormLabel>Username</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="cool name"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <FormErrorMessage>
                                Username must be at least 3 characters long.
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            mt={3}
                            isInvalid={!emailValid && email.length > 0}
                        >
                            <FormLabel>Email</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="email@mail.cool"
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
                            />
                            <FormErrorMessage>
                                Password must be at least 8 characters long.
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            mt={3}
                            isInvalid={!passwordsMatch && passwordC.length > 0}
                        >
                            <FormLabel>Confirm password</FormLabel>
                            <Input
                                placeholder="same hard password"
                                value={passwordC}
                                type="password"
                                onChange={(e) => {
                                    setPasswordC(e.target.value);
                                }}
                            />
                        </FormControl>
                        <FormErrorMessage>
                            Passwords do not match.
                        </FormErrorMessage>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>
                            Cancel
                        </Button>
                        <Button
                            isDisabled={
                                !(
                                    emailValid &&
                                    passwordValid &&
                                    passwordsMatch &&
                                    usernameValid
                                )
                            }
                            colorScheme="blue"
                            onClick={async () => {
                                onClose();
                                try {
                                    await register({
                                        username,
                                        email,
                                        password,
                                    });
                                    toast({
                                        title: "Registration successful.",
                                        description:
                                            "You can now log in with your credentials.",
                                        status: "success",
                                    });
                                } catch (error) {
                                    toast({
                                        title: (error as Error).message,
                                        status: "error",
                                    });
                                }
                            }}
                        >
                            Register
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default RegisterModal;
