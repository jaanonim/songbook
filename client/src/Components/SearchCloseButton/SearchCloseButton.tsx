import { SmallCloseIcon } from "@chakra-ui/icons";
import styles from "./SearchCloseButton.module.css";

interface SearchCloseButtonProps {
    onClick?: () => void;
}

function SearchCloseButton(props: SearchCloseButtonProps) {
    return (
        <button className={styles.button} onClick={props.onClick}>
            <SmallCloseIcon boxSize={5}></SmallCloseIcon>
        </button>
    );
}

export default SearchCloseButton;
