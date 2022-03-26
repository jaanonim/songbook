import { useToast } from "@chakra-ui/react";
import { useQueryClient, useMutation } from "react-query";
import { createSong } from "../Services/api";

function useCreateSong() {
	const queryClient = useQueryClient();
	const toast = useToast();

	const create = useMutation(createSong, {
		onSettled: (newItem, error, variables, context) => {
			if (error) {
				toast({
					title: (error as Error).message,
					status: "error",
				});
			} else {
				toast({
					title: `Created ${variables.song.title}`,
					status: "success",
				});
				queryClient.invalidateQueries("song");
			}
		},
	});
	return create;
}

export default useCreateSong;
