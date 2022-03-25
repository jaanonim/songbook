import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";

interface DeleteButtonProps {
	onClick?: (e: any) => boolean;
}

function DeleteButton(props: DeleteButtonProps) {
	const [loading, setLoading] = useState(false);

	return (
		<IconButton
			size="sm"
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
