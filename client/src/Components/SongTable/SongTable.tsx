import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Divider,
	Flex,
	Input,
	Progress,
	Table,
	Tbody,
	Td,
	Tooltip,
	Tr,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useDebounce } from "usehooks-ts";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import Song from "../../Models/Song";
import { getSongs } from "../../Services/api";
import CreateSong from "../CreateSong";
import SongTableElement from "../SongTableElement";

interface SongTableProps {
	onSongClick: (song: Song) => void;
	onDelete?: (song: Song) => void;
}

function SongTable(props: SongTableProps) {
	const [filter, setFilter] = React.useState<string | undefined>(undefined);
	const debouncedFilter = useDebounce(filter, 500);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFilter(event.target.value);
	};

	const [song, setSong] = useState<Song | null>(null);

	const { status, data, error, isFetching, fetchNextPage, hasNextPage } =
		useInfiniteQuery(["song", debouncedFilter], getSongs, {
			getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
		});

	const loadMoreButtonRef =
		React.useRef() as React.MutableRefObject<HTMLTableRowElement>;

	useIntersectionObserver({
		target: loadMoreButtonRef,
		onIntersect: fetchNextPage,
		enabled: !!hasNextPage,
	});

	return (
		<Box
			w="100vw"
			h="calc(100vh - 2rem)"
			border="1px"
			borderColor="rgba(255,255,255,0.1)"
			borderRadius={5}
			m="1rem"
		>
			<Box m="1rem" h="2.5rem">
				<Flex justify="center">
					<Tooltip label="Use # to search by tag 😉">
						<Input
							placeholder="Search"
							value={filter}
							onChange={handleChange}
						/>
					</Tooltip>
					<CreateSong></CreateSong>
				</Flex>
			</Box>
			<Divider />

			<Box h="calc(100vh - 1px - 6.5rem)" overflowY="scroll">
				{error ? (
					<Alert
						status="error"
						variant="subtle"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						textAlign="center"
						minHeight="10rem"
						width="xl"
						m="1rem auto"
						borderRadius={5}
					>
						<AlertIcon boxSize="10" mr="0" />
						<AlertTitle mt={4} mb={1} fontSize="lg">
							Error:
						</AlertTitle>
						<AlertDescription maxWidth="sm">
							{(error as Error).message}
						</AlertDescription>
					</Alert>
				) : (
					<Table>
						<Tbody>
							{data?.pages.map((page) => (
								<React.Fragment key={page.nextPage}>
									{page.docs.map((element: Song) => {
										element = new Song(element);
										return (
											<SongTableElement
												key={element._id}
												song={element}
												onDelete={props.onDelete}
												selected={
													song?._id === element._id
												}
												onDoubleClick={() => {
													if (
														song?._id !==
														element._id
													) {
														props.onSongClick(
															element
														);
														setSong(element);
													}
												}}
											/>
										);
									})}
								</React.Fragment>
							))}
							<Tr ref={loadMoreButtonRef}>
								<Td colSpan={3}>
									<Box
										w="100%"
										bg="rgba(255,255,255,0.1)"
										borderRadius="5px"
										textAlign="center"
										fontSize="sm"
										p="1rem"
									>
										{isFetching || hasNextPage ? (
											<Progress
												size="xs"
												isIndeterminate
											/>
										) : (
											"No songs here"
										)}
									</Box>
								</Td>
							</Tr>
						</Tbody>
					</Table>
				)}
			</Box>
		</Box>
	);
}
export default SongTable;
