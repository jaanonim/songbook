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
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { firstUpper } from "../../Utilities/text";
function LoginModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn, user, login, logout } = useAuth();

    console.log(user);

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
                        <FormControl isRequired>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>
                            Cancel
                        </Button>
                        <Button
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
