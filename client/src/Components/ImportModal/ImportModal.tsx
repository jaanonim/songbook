import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import {
	Button,
	Center,
	CloseButton,
	IconButton,
	List,
	ListIcon,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Progress,
	useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdUpload } from "react-icons/md";
import { useQueryClient } from "react-query";
import { importSong } from "../../Services/api";
import { limitLength } from "../../Utilities/text";
import TagList from "../TagList";
import "./ImportModal.css";

function ImportModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [tags, setTags] = useState([]);
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [results, setResults] = useState([]);
	const list = useRef(
		null
	) as unknown as React.MutableRefObject<HTMLUListElement>;
	const queryClient = useQueryClient();

	const importS = async () => {
		const f = files.pop();
		setFiles(files);
		try {
			const res = await importSong(f);
			results.push(res as never);
		} catch (e) {
			results.push(f as never);
		}
		setResults(results);
		if (files.length > 0) {
			setUploadProgress(
				uploadProgress + 100 / (files.length + results.length)
			);
		} else {
			setUploadProgress(100);
			queryClient.invalidateQueries("song");
		}
		list.current?.scrollTo(0, list.current?.scrollHeight);
	};

	useEffect(() => {
		if (files.length > 0) importS();
	}, [uploadProgress]);

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
		setUploading(false);
		setUploadProgress(0);
		setFiles([]);
		setResults([]);
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
			<Modal
				isOpen={isOpen}
				onClose={myClose}
				closeOnOverlayClick={!uploading}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Import songs</ModalHeader>
					<ModalCloseButton isDisabled={uploading} />
					<ModalBody>
						{!uploading ? (
							<>
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
										<Center w="100%">
											Drop your songs here
										</Center>
									) : (
										<Center
											w="100%"
											overflowY="scroll"
											maxH="sm"
										>
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
																		(
																			f: any
																		) =>
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
							</>
						) : (
							<>
								<Progress value={uploadProgress}></Progress>
								<List
									mt={4}
									overflowY="scroll"
									maxH="sm"
									ref={list}
								>
									{results.map((file: any) =>
										file._id ? (
											<ListItem key={file._id}>
												<ListIcon
													as={CheckCircleIcon}
													color="green.500"
												></ListIcon>
												{file.title}
											</ListItem>
										) : (
											<ListItem key={file.name}>
												<ListIcon
													as={WarningIcon}
													color="red.500"
												></ListIcon>
												{file.name}
											</ListItem>
										)
									)}
								</List>
							</>
						)}
					</ModalBody>

					<ModalFooter>
						{uploadProgress !== 100 ? (
							<>
								<Button
									colorScheme="blue"
									mr={3}
									isDisabled={files.length === 0}
									isLoading={uploading}
									onClick={async () => {
										setUploading(true);
										importS();
									}}
								>
									Import
								</Button>
								<Button
									variant="ghost"
									onClick={myClose}
									isDisabled={uploading}
								>
									Cancel
								</Button>
							</>
						) : (
							<Button colorScheme="blue" mr={3} onClick={myClose}>
								Ok
							</Button>
						)}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default ImportModal;
