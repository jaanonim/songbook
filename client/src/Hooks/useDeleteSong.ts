import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { delSong } from "../Services/api";

function useDeleteSong(title: string) {
	const queryClient = useQueryClient();
	const toast = useToast();

	const del = useMutation(delSong, {
		onSettled: (newItem, error, variables, context) => {
			if (error) {
				toast({
					title: (error as Error).message,
					status: "error",
				});
			} else {
				toast({
					title: `Deleted ${title}`,
					status: "success",
				});
				queryClient.invalidateQueries("song");
			}
		},
	});
	return del;
}

export default useDeleteSong;
