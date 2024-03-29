import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { createSong } from "../Services/api";

function useCreateSong(callback: (song: any) => void) {
    const queryClient = useQueryClient();
    const toast = useToast();

    const create = useMutation(createSong, {
        onSettled: (newItem, error, variables, _context) => {
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
                callback(newItem);
            }
        },
    });
    return create;
}

export default useCreateSong;
