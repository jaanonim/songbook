import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import {
	Box,
	Center,
	Heading,
	Modal,
	ModalContent,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";

function ImportDropzone() {
	const onDrop = useCallback((files) => {
		console.log(files);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<Box
				w="100vw"
				h="100vh"
				position="fixed"
				zIndex={isDragActive ? 2000 : 0}
			>
				{isDragActive ? (
					<Box
						w="100vw"
						h="100vh"
						display="flex"
						alignItems="center"
						flexDirection="row"
						textAlign="center"
						backgroundColor="rgba(30,30,50,0.7)"
					>
						<Center display="block" margin="auto">
							<Center>
								<MdUpload size="5rem"></MdUpload>
							</Center>
							<Heading mb={4}>Import Songs</Heading>
							<Text fontSize="xl">
								Drop your songs files hear to import them 🚀
							</Text>
						</Center>
					</Box>
				) : (
					<></>
				)}
			</Box>
		</div>
	);
}

export default ImportDropzone;
