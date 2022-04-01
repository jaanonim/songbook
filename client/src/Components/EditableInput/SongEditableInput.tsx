import {
	Editable,
	EditableInput,
	EditablePreview,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import useUpdateSong from "../../Hooks/useUpdateSong";
import { firstUpper, limitLength } from "../../Utilities/text";

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
	const [value, setValue] = React.useState(props.value);
	const [valueLast, setValueLast] = React.useState(props.value);
	const [isEditing, setIsEditing] = React.useState(false);
	const toast = useToast();

	const update = useUpdateSong(props.name);

	return (
		<Editable
			onEdit={() => {
				setIsEditing(true);
			}}
			display={props.display}
			ml={props.ml}
			value={isEditing ? value : limitLength(value)}
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
							title: `${firstUpper(props.name)} cannot be empty`,
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
