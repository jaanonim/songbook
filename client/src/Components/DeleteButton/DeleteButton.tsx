import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

interface DeleteButtonInterface {
	onClick?: () => void;
}

function DeleteButton(props: DeleteButtonInterface) {
	return (
		<IconButton
			ml="2"
			mr="2"
			size="sm"
			aria-label="delete"
			_hover={{
				bg: "red.600",
			}}
			onClick={props.onClick}
			icon={<DeleteIcon />}
		></IconButton>
	);
}

export default DeleteButton;
