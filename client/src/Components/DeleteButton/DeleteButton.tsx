import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";

interface DeleteButtonProps {
    size?: string;
    marginX?: string;
    isDisabled?: boolean;
    onClick?: (e: any) => boolean;
}

function DeleteButton(props: DeleteButtonProps) {
    const [loading, setLoading] = useState(false);

    return (
        <IconButton
            size={props.size || "sm"}
            marginX={props.marginX}
            isDisabled={props.isDisabled}
            aria-label="delete"
            _hover={{
                bg: "red.600",
            }}
            onClick={(e) => {
                if (props.onClick) {
                    setLoading(props.onClick(e));
                }
            }}
            isLoading={loading}
            icon={<DeleteIcon />}
        ></IconButton>
    );
}

export default DeleteButton;
