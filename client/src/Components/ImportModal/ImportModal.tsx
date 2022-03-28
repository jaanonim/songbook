import {
	useDisclosure,
	IconButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Center,
	List,
	ListItem,
	CloseButton,
	Heading,
} from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdUpload } from "react-icons/md";
import "./ImportModal.css";
import { limitLength } from "../../Utilities/text";
import TagList from "../TagList";

function ImportModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [tags, setTags] = useState([]);
	const [files, setFiles] = useState([]);
	const onDrop = useCallback(
		(f: any) => {
			f = f.filter(
				(ele: any) =>
					files.filter((e: any) => e.name === ele.name).length === 0
			);
			setFiles(files.concat(f));
		},
		[files]
	);
	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject,
	} = useDropzone({ onDrop });

	const myClose = () => {
		setFiles([]);
		setTags([]);
		onClose();
	};

	return (
		<>
			<IconButton
				style={{ position: "fixed", top: "10px", right: "10px" }}
				aria-label="Import"
				icon={<MdUpload />}
				onClick={onOpen}
			></IconButton>
			<Modal isOpen={isOpen} onClose={myClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Import songs</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div
							{...getRootProps({ className: "dropzone" })}
							style={
								isDragAccept
									? {
											backgroundColor:
												"rgba(100, 120, 150, 1)",
									  }
									: {}
							}
						>
							<input {...getInputProps()} />
							{files.length === 0 ? (
								<Center w="100%">Drop your songs here</Center>
							) : (
								<Center w="100%">
									<List>
										{files.map((file: any) => (
											<ListItem key={file.name}>
												{limitLength(file.name)}
												<CloseButton
													display="inline"
													onClick={(e) => {
														e.stopPropagation();
														setFiles(
															files.filter(
																(f: any) =>
																	f.name !==
																	file.name
															)
														);
													}}
												/>
											</ListItem>
										))}
									</List>
								</Center>
							)}
						</div>
						{files.length !== 0 ? (
							<Center>
								<TagList
									tags={tags}
									saveTags={(t: any) => {
										setTags(t);
									}}
								></TagList>
							</Center>
						) : (
							<></>
						)}
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							isDisabled={files.length === 0}
							onClick={myClose}
						>
							Import
						</Button>
						<Button variant="ghost" onClick={myClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default ImportModal;
