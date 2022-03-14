import { AddIcon } from "@chakra-ui/icons";
import {
	Box,
	Flex,
	Tooltip,
	Input,
	IconButton,
	Divider,
	Table,
	Tbody,
	Tr,
	Td,
	Text,
	Tag,
	TagLabel,
	TagCloseButton,
	Progress,
} from "@chakra-ui/react";
import DeleteButton from "../DeleteButton";
import { useInfiniteQuery } from "react-query";
import { getSongs } from "../../Services/api";
import React, { ChangeEvent } from "react";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import { useDebounce } from "usehooks-ts";

function SongTable() {
	interface Song {
		id: string;
		title: string;
		author: string;
		tags: string[];
	}

	const [filter, setFilter] = React.useState<string | undefined>(undefined);
	const debouncedFilter = useDebounce(filter, 500);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFilter(event.target.value);
	};

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
					<IconButton
						aria-label="Add tag"
						icon={<AddIcon />}
						ml="2"
					/>
				</Flex>
			</Box>
			<Divider />

			<Box h="calc(100vh - 1px - 6.5rem)" overflowY="scroll">
				{error ? (
					<Text>Something went wrong!</Text>
				) : (
					<Table>
						<Tbody>
							{data?.pages.map((page) => (
								<React.Fragment key={page.nextPage}>
									{page.docs.map((element: Song) => (
										<Tr key={element.id}>
											<Td>
												{element.title} (
												{element.author})
											</Td>
											<Td>
												{element.tags.map(
													(n: string) => (
														<Tag m="1">
															<TagLabel>
																{n}
															</TagLabel>
															<TagCloseButton />
														</Tag>
													)
												)}

												<IconButton
													aria-label="Add tag"
													icon={<AddIcon />}
													h="1.5rem"
													w="1.5rem"
													m="1"
												/>
											</Td>
											<Td>
												<DeleteButton />
											</Td>
										</Tr>
									))}
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
										{isFetching ? (
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
