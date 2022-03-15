import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";

interface DeleteButtonProps {
	onClick?: () => boolean;
}

function DeleteButton(props: DeleteButtonProps) {
	const [loading, setLoading] = useState(false);

	return (
		<IconButton
			ml="2"
			mr="2"
			size="sm"
			aria-label="delete"
			_hover={{
				bg: "red.600",
			}}
			onClick={() => {
				if (props.onClick) {
					setLoading(props.onClick());
				}
			}}
			isLoading={loading}
			icon={<DeleteIcon />}
		></IconButton>
	);
}

export default DeleteButton;
