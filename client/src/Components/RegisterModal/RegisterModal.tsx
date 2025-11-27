import {
    Button,
    FormControl,
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
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuth from "../../Hooks/useAuth";

function RegisterModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordC, setPasswordC] = useState("");
    const { isLoggedIn } = useAuth();

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
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="cool name"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl isRequired mt={3}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="email@mail.cool"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl isRequired mt={3}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                placeholder="hard password"
                                value={password}
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl isRequired mt={3}>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                onClose();
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
