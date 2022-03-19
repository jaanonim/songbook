import {
	Editable,
	EditableInput,
	EditablePreview,
	useEditableControls,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import { useQueryClient, useMutation } from "react-query";
import { updateSong } from "../../Services/api";

interface EditableInputProps {
	id: string;
	value: string;
	name: string;
	textAlign?: "left" | "center" | "right";
	ml?: any;
	display?: string;
	canBeEmpty?: boolean;
	getObject: (value: string) => any;
}

function SongEditableInput(props: EditableInputProps) {
	const queryClient = useQueryClient();
	const [value, setValue] = React.useState(props.value);
	const [valueLast, setValueLast] = React.useState(props.value);
	const [isEditing, setIsEditing] = React.useState(false);
	const toast = useToast();

	const update = useMutation(updateSong, {
		onSettled: (newItem, error, variables, context) => {
			if (error) {
				toast({
					title: (error as Error).message,
					status: "error",
				});
			} else {
				toast({
					title: `Updated ${props.name}`,
					status: "success",
				});
				queryClient.invalidateQueries("song");
			}
		},
	});

	return (
		<Editable
			onEdit={() => {
				setIsEditing(true);
			}}
			display={props.display}
			ml={props.ml}
			value={value}
			placeholder={isEditing ? `Enter ${props.name}` : `empty`}
			color={value.length == 0 ? "gray.500" : "white"}
			onChange={(v) => {
				setValue(v);
			}}
			onSubmit={(v) => {
				setIsEditing(false);
				if (v != valueLast) {
					if (!props.canBeEmpty && v.trim().length === 0) {
						setValue(valueLast);
						toast({
							title: `${
								props.name.charAt(0).toUpperCase() +
								props.name.slice(1)
							} cannot be empty`,
							status: "error",
						});
						return;
					}
					setValueLast(v);
					update.mutate({
						id: props.id,
						song: props.getObject(v),
					});
				}
			}}
			onCancel={() => {
				setValue(valueLast);
				setIsEditing(false);
			}}
		>
			<EditablePreview />
			<EditableInput textAlign={props.textAlign} />
		</Editable>
	);
}

export default SongEditableInput;
