import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { updateSong } from "../Services/api";

function useUpdateSong(title: string) {
    const queryClient = useQueryClient();
    const toast = useToast();
    const update = useMutation(updateSong, {
        onSettled: (_newItem, error, _variables, _context) => {
            if (error) {
                toast({
                    title: (error as Error).message,
                    status: "error",
                });
            } else {
                toast({
                    title: `Updated ${title}`,
                    status: "success",
                });
                queryClient.invalidateQueries("song");
            }
        },
    });
    return update;
}

export default useUpdateSong;
